import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { environment } from "../../../environments/environment";
import { AuthResponseData } from "../../models/auth-response.model";
import { User } from "../../models/user.model";
import * as AuthActions from "./auth.actions";
import * as fromApp from "../app.reducer";
import { AuthService } from "../../services/auth/auth.service";

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  console.log('storing');
  console.log(user);
  
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticationSuccess({
    email: resData.email,
    id: resData.localId,
    _token: resData.idToken,
    _tokenExpirationDate: expirationDate,
    redirect: true
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
    private router: Router,
    private authService: AuthService
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
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000)
            }),
            map(handleAuthentication),
            catchError(handleError)
          );
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
          .pipe(
            tap((resData) =>{              
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(handleAuthentication),
            catchError(handleError)
          );
      })
    )
  );

  authAutoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'x' };
        }

        const expirationDate = new Date(userData._tokenExpirationDate);
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          expirationDate
        );

        if (loadedUser.token) {
          //token valid          
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authenticationSuccess({
            email: loadedUser.email,
            id: loadedUser.id,
            _token: loadedUser.token,
            _tokenExpirationDate: expirationDate,
            redirect: false
          });
        }
        return { type: 'x' };
      })
    )
  );

  authLogout = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {        
        this.authService.clearLogoutTimer();
        console.log('logout');
        
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      })
    ), { dispatch: false }
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticationSuccess),
        tap((authSuccessAction) => {
          if (authSuccessAction.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );
}