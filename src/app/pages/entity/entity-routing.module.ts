import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/core/guards/auth.guard'
import { ClinicComponent } from './entity.component'

const routes: Routes = [
  {
    path: '',
    component: ClinicComponent
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./manage-entity/manage-entity.module').then(
        m => m.ManageEntityModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    loadChildren: () =>
      import('./view-entity/view-entity.module').then(m => m.ViewEntityModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./manage-entity/manage-entity.module').then(
        m => m.ManageEntityModule
      ),
    canActivate: [AuthGuard]
  },
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
export class EntityRoutingModule {}
