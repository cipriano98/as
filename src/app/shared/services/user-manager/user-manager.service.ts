import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  FirstValueFromConfig,
  firstValueFrom
} from 'rxjs/internal/firstValueFrom'
import { environment } from 'src/environments/environment'

export interface UserManager {
  id: string
  name: string
  email: string
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  constructor(private readonly http: HttpClient) {}

  public readonly userManager$ = this.getUser()

  private async getUser(): Promise<UserManager | null> {
    const userId = localStorage.getItem('user')

    if (!userId) {
      return null
    }

    const defaultValue: FirstValueFromConfig<UserManager | null> = {
      defaultValue: null
    }

    const userManager: Observable<UserManager> = this.http.get<UserManager>(
      `${environment.api}/user/${userId}`
    )

    return firstValueFrom(userManager, defaultValue)
  }
}
