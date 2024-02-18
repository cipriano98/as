import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EntityComponent } from './entity.component'

const routes: Routes = [
  {
    path: '',
    component: EntityComponent
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./manage-entity/manage-entity.module').then(
        m => m.ManageEntityModule
      )
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./manage-entity/manage-entity.module').then(
        m => m.ManageEntityModule
      )
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
