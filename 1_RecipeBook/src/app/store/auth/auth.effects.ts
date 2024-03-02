import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as AuthActions from "./auth.actions";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthResponseData } from "../../models/auth-response.model";
import { environment } from "../../../environments/environment";
import * as fromApp from "../app.reducer";
import { Router } from "@angular/router";

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  return AuthActions.authenticationSuccess({
    email: resData.email,
    id: resData.localId,
    _token: resData.idToken,
    _tokenExpirationDate: expirationDate,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticationFail({ errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email not found!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Invalid password!';
      break;
    case 'INVALID_LOGIN_CREDENTIALS':
      errorMessage = 'Invalid login or password!';
      break;
    case 'USER_DISABLED':
      errorMessage = 'User disabled!';
      break;

    default:
      break;
  }
  return of(AuthActions.authenticationFail({ errorMessage }));
}

@Injectable()
export class AuthEffects {
  private readonly key = environment.appKey;
  private readonly singUpEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key;
  private readonly singInEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.key;

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private router: Router
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(this.singUpEndpoint, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .pipe(map(handleAuthentication), catchError(handleError));
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(this.singInEndpoint, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .pipe(map(handleAuthentication), catchError(handleError));
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticationSuccess, AuthActions.logout),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}