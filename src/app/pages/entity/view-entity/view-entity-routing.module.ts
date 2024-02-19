import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ViewEntityComponent } from './view-entity.component'

const routes: Routes = [
  { path: '', component: ViewEntityComponent },
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
export class ViewEntityRoutingModule {}
