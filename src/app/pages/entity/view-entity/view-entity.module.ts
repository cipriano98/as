import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { NgxMaskModule } from 'ngx-mask'
import { ClinicService } from '../services/entity.service'
import { ViewEntityRoutingModule } from './view-entity-routing.module'
import { ViewEntityComponent } from './view-entity.component'

@NgModule({
  declarations: [ViewEntityComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ViewEntityRoutingModule
  ],
  providers: [ClinicService]
})
export class ViewEntityModule {}
