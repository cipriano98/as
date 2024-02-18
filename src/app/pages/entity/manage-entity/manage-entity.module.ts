import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { EntityService } from '../service/entity.service'
import { ManageEntityRoutingModule } from './manage-entity-routing.module'
import { ManageEntityComponent } from './manage-entity.component'

@NgModule({
  declarations: [ManageEntityComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ManageEntityRoutingModule
  ],
  providers: [EntityService]
})
export class ManageEntityModule {}
