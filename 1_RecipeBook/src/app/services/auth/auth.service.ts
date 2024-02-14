import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  id_token: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'AIzaSyAAzZW6nq9ZOBsclNrRvvICltSAb9o-TJc';
  private endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key;;

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.endpoint + '',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );

  }
}
