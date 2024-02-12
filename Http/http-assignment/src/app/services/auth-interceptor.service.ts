import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Request intercepted');
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'Bearer fdihfihu9r38duf894')});
    return next.handle(modifiedRequest);
  }

}