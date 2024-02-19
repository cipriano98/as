import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { UserManagerService } from 'src/app/shared/services/user-manager/user-manager.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly userManagerService: UserManagerService) {}

  async canActivate(): Promise<boolean> {
    const user = await this.userManagerService.userManager$

    if (location.href.endsWith('login')) {
      return !user
    }

    if (!user) {
      location.href = 'login'
    }

    return !!user
  }
}
