import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { FormUtils } from 'src/app/shared/utils/form/form.utils'
import { IMedicalSpeciality } from '../models/medical-speciality.model'
import { IRegion } from '../models/region.model'
import { ClinicService } from '../services/entity.service'
import { MedicalSpecialityService } from '../services/medical-speciality.service'
import { RegionService } from '../services/region.service'

@Component({
  templateUrl: './manage-entity.component.html',
  styleUrls: ['./manage-entity.component.scss']
})
export class ManageEntityComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly regionService: RegionService,
    private readonly medicalSpecialityService: MedicalSpecialityService,
    private readonly service: ClinicService
  ) {}

  public readonly form: FormGroup = this.buildForm()

  public regions: IRegion[] = []
  public medicalSpecialities: IMedicalSpeciality[] = []
  public loadingClinic = false
  public loadingRegions = false
  public loadingMedicalSpecialities = false
  public submitted = false
  public id?: string

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: param => {
        const { id } = param
        id && this.findOne(id)
        this.getMedicalSpecialities()
        this.getRegions()
      }
    })
  }

  public save(): void {
    this.submitted = true

    if (this.form.valid) {
      const { medicalSpecialities } = this.form.value

      const body = {
        ...this.form.value,
        medicalSpecialities: medicalSpecialities.map((speciality: string) => {
          return {
            id: speciality
          }
        })
      }

      const save = this.id
        ? this.service.update(this.id, body)
        : this.service.create(body)

      this.loadingClinic = true
      save.subscribe({
        next: data => {
          const action = this.id ? 'Editada' : 'Criada'
          const message = `Clínica ${action} com sucesso`

          this.snackBar.open(message, 'ok', {
            duration: 3 * 1000
          })

          this.goToView(data.id!)
          this.loadingClinic = false
        },
        error: (err: HttpErrorResponse) => {
          const error = 'Ocorreu um erro inesperado. Tente novamente mais tarde'

          const message = err.error?.message ?? error

          this.snackBar.open(message, 'ok', {
            duration: 3 * 1000
          })
          this.loadingClinic = false
        }
      })

      return
    }

    const message = 'Por favor, corrija os erros no formulário para continuar'
    this.snackBar.open(message, 'ok', {
      duration: 3 * 1000
    })

    this.form.markAllAsTouched()
  }

  public goToList(): void {
    this.router.navigate(['clinic'])
  }

  public goToView(id: string): void {
    this.router.navigate(['clinic', id, 'view'])
  }

  public remove(): void {
    this.loadingClinic = true
    this.service.remove(this.id!).subscribe({
      next: () => {
        this.loadingClinic = false
        this.router.navigate(['clinic'])

        const message = 'Clínica Removida com sucesso'
        this.snackBar.open(message, 'ok', {
          duration: 3000
        })
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.message ?? 'Ocorreu um erro inesperado'

        this.snackBar.open(message, 'ok', {
          duration: 3000
        })

        this.loadingClinic = false
      }
    })
  }

  private findOne(id: string): void {
    this.id = id
    this.loadingClinic = true
    this.service.findOne(id).subscribe({
      next: data => {
        this.form.patchValue(data)
        this.loadingClinic = false
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.message ?? 'Ocorreu um erro inesperado'

        this.snackBar.open(message, 'ok', {
          duration: 3000
        })
        this.loadingClinic = false
      }
    })
  }

  private getMedicalSpecialities(): void {
    this.loadingMedicalSpecialities = true

    this.medicalSpecialityService.findAll().subscribe({
      next: data => {
        this.medicalSpecialities = data
        this.loadingMedicalSpecialities = false
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.message ?? 'Ocorreu um erro inesperado'
        this.loadingMedicalSpecialities = false

        this.snackBar.open(message, 'ok', {
          duration: 3000
        })
      }
    })
  }

  private getRegions(): void {
    this.loadingRegions = true
    this.regionService.findAll().subscribe({
      next: data => {
        this.regions = data
        this.loadingRegions = false
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.message ?? 'Ocorreu um erro inesperado'
        this.loadingRegions = false

        this.snackBar.open(message, 'ok', {
          duration: 3000
        })
      }
    })
  }

  private buildForm(): FormGroup {
    const form: FormGroup = new FormBuilder().group({
      corporateName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      tradeName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      region: ['', [Validators.required]],
      openingDate: ['', [Validators.required]],
      active: [false],
      medicalSpecialities: [[], [Validators.required, Validators.minLength(5)]]
    })

    return form
  }

  public get formErrors(): Record<string, string> | null {
    if (!this.submitted) return null

    return FormUtils.formValid(this.form)
  }

  public get loading(): boolean {
    return (
      this.loadingClinic &&
      this.loadingRegions &&
      this.loadingMedicalSpecialities
    )
  }
}
