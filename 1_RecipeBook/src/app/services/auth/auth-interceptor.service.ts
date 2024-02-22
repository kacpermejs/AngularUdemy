import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');
    return this.auth.user.pipe(
      take(1),
      exhaustMap( user => {
        console.log('try auth')
        if (!user) {
          return next.handle(req);
        }
        console.log('user set')

        const modifiedReq = req.clone(
          {
            params: new HttpParams().set('auth', user.token)
          }
        );

        return next.handle(modifiedReq);
      }),
    );
  }

}