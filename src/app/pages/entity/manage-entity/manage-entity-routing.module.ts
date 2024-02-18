import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManageEntityComponent } from './manage-entity.component'

const routes: Routes = [
  { path: '', component: ManageEntityComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEntityRoutingModule {}
