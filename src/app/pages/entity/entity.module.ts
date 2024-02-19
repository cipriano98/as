import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { EntityRoutingModule } from './entity-routing.module'
import { ClinicComponent } from './entity.component'
import { ClinicService } from './services/entity.service'
import { MedicalSpecialityService } from './services/medical-speciality.service'
import { RegionService } from './services/region.service'

@NgModule({
  declarations: [ClinicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    EntityRoutingModule
  ],
  providers: [ClinicService, RegionService, MedicalSpecialityService]
})
export class EntityModule {}
