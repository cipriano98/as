import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IUserLoginResponse } from '../models/user-login-respose.model'
import { IUserLogin } from '../models/user-login.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}`

  public authenticate(data: IUserLogin): Observable<IUserLoginResponse> {
    return this.http
      .post<IUserLoginResponse>(`${this.url}/login`, data)
      .pipe(take(1))
  }
}
