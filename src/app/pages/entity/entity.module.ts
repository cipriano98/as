import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { EntityRoutingModule } from './entity-routing.module'
import { EntityComponent } from './entity.component'
import { EntityService } from './service/entity.service'

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    EntityRoutingModule
  ],
  providers: [EntityService]
})
export class EntityModule {}
