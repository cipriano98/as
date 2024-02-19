import { Component } from '@angular/core'
import { UserManagerService } from './shared/services/user-manager/user-manager.service'

@Component({
  selector: 'as-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly userManager: UserManagerService) {}

  public readonly userManager$ = this.userManager.userManager$

  public logout(): void {
    localStorage.clear()
    location.reload()
  }
}
