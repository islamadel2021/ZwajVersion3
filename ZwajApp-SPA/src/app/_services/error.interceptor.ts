import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          // 1. التعامل مع الأخطاء العامة (Application-Error)
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(() => new Error(applicationError));
          }

          // 2. التعامل مع أخطاء الـ ModelState (Validation Errors) القادمة من السيرفر
          const serverError = error.error;
          let modelStateErrors = '';

          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
              }
            }
          }

          //Unthorized Error
          if (error.status === 401) {
            return throwError(() => new Error(error.statusText));
          }

          // إرجاع الأخطاء مجمعة، أو الـ serverError لو نص، أو رسالة عامة
          return throwError(
            () => new Error(modelStateErrors || serverError || 'Server Error'),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
