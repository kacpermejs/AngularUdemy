import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

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

  private key = 'AIzaSyAAzZW6nq9ZOBsclNrRvvICltSAb9o-TJc';
  private singUpEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key;
  private singInEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key;

  constructor(private http: HttpClient) { }

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
    
    console.log(this.user);
    this.user.next(user);

  }
}
