import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { authToken } from 'src/app/Constants/constats';

@Injectable({
  providedIn: 'root',
})
export class ServerInterceptor
  extends LocalstorageService
  implements HttpInterceptor
{
  constructor() {
    super();
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = <string>this.getLocalItem(authToken);
    if (token) token = token.slice(1, -1);

    const newReq = req.clone({
      setHeaders: { Authorization: `Bearer  ${token}` },
    });

    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
        } else if (error.status === 404) {
          alert('Not found');
        } else if (error.status === 500) {
          alert(error);
        } else {
          console.error('An error occurred:', error);
        }
        return throwError(error);
      })
    );
  }
}
