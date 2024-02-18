import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { EntityService } from '../service/entity.service'

@Component({
  templateUrl: './manage-entity.component.html',
  styleUrls: ['./manage-entity.component.scss']
})
export class ManageEntityComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly service: EntityService
  ) {}

  public readonly form: FormGroup = this.buildForm()

  public loading = false
  public id?: string

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: param => {
        const { id } = param
        id && this.findOne(id)
      }
    })
  }

  public save(): void {
    if (this.form.valid) {
      const body = { ...this.form.value }
      Reflect.deleteProperty(body, 'department')
      Reflect.deleteProperty(body, 'office')

      const save = this.id
        ? this.service.update(this.id, body)
        : this.service.create(body)

      this.loading = true
      save.subscribe({
        next: data => {
          alert(`Entidade ${data.id} salva com sucesso!`)
          this.goToList()
          this.loading = false
        },
        error: (err: HttpErrorResponse) => {
          alert(err.error.message)
          this.loading = false
        }
      })

      return
    }

    alert('Por favor, corrija os erros no formulário para continuar')
    this.form.markAllAsTouched()
  }

  public goToList(): void {
    this.router.navigate(['entity'])
  }

  public generateLabel(label: string): string {
    const labels: { [key: string]: string } = {
      corporateName: 'Razão Social',
      tradeName: 'Nome Fantasia',
      cnpj: 'CNPJ',
      region: 'Região',
      openingDate: 'Data de Inauguração ',
      active: 'Gênero',
      medicalSpecialties: 'DDI'
    }

    return labels[label]
  }

  private findOne(id: string): void {
    this.id = id
    this.loading = true
    this.service.findOne(id).subscribe({
      next: data => {
        this.form.patchValue(data)
        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error.massage)
        this.loading = false
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
      active: [false, [Validators.required]],
      medicalSpecialties: [[], [Validators.required]]
    })

    return form
  }
}
