import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    {
      const access_token = localStorage.getItem('access_token')

      if (access_token) {
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${access_token}`
          }
        })

        return next.handle(authRequest)
      }

      return next.handle(request)
    }
  }
}
