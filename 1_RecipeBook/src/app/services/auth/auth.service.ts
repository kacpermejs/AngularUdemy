import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  
  private tokenExpirationTimer: any;

  private key = environment.appKey;
  private singUpEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key;
  private singInEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.singUpEndpoint + '',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError( e => this.handleError(e) ),
      tap( r => this.handleAuthentication(r) )
    );

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.singInEndpoint + '',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError( e => this.handleError(e) ),
      tap( r => this.handleAuthentication(r) )
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) { //token valid
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(e: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'

    if (!e.error || !e.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (e.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email not found!'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password!'
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login or password!'
        break;
      case 'USER_DISABLED':
        errorMessage = 'User disabled!'
        break;
    
      default:
        break;
    }

    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(r: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +r.expiresIn * 1000
    );
    const user = new User(
      r.email,
      r.localId,
      r.idToken,
      expirationDate
    );
    
    this.user.next(user);
    this.autoLogout(+r.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));

  }
}
