import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { FormUtils } from 'src/app/shared/utils/form/form.utils'
import { IEntity } from '../models/entity.model'
import { EntityService } from '../service/entity.service'

const REGION_DATA = [
  { value: '1', label: 'Alto tietê' },
  { value: '2', label: 'Interior' },
  { value: '3', label: 'ES' },
  { value: '4', label: 'SP Interior' },
  { value: '5', label: 'SP' },
  { value: '6', label: 'SP2' },
  { value: '7', label: 'MG' },
  { value: '8', label: 'Nacional' },
  { value: '9', label: 'SP CAV' },
  { value: '10', label: 'RJ' },
  { value: '11', label: 'SP2' },
  { value: '12', label: 'SP1' },
  { value: '13', label: 'NE1' },
  { value: '14', label: 'NE2' },
  { value: '15', label: 'SUL' },
  { value: '16', label: 'Norte' }
]

const MEDICAL_SPECIALTIES = [
  { value: '1', label: 'Acupuntura' },
  { value: '2', label: 'Alergia e Imunologia' },
  { value: '3', label: 'Anestesiologista' },
  { value: '4', label: 'Angiologia' },
  { value: '5', label: 'Cardiologia' },
  { value: '6', label: 'Cirurgia Cardiovascular' },
  { value: '7', label: 'Cirurgia da Mão' },
  { value: '8', label: 'Cirurgia de Cabeça e Pescoço' },
  { value: '9', label: 'Cirurgia do Aparelho Digestivo' },
  { value: '10', label: 'Cirurgia Geral' },
  { value: '11', label: 'Cirurgia Oncológica' },
  { value: '12', label: 'Cirurgia Pediátrica' },
  { value: '13', label: 'Cirurgia Plástica' },
  { value: '14', label: 'Cirurgia Torácica' },
  { value: '15', label: 'Cirurgia Vascular' },
  { value: '16', label: 'Clínica Médica' },
  { value: '17', label: 'Coloproctologia' },
  { value: '18', label: 'Dermatologia' },
  { value: '19', label: 'Endocrinologia e Metabologia' },
  { value: '20', label: 'Endoscopia' },
  { value: '21', label: 'Gastroenterologia' },
  { value: '22', label: 'Genética Médica' },
  { value: '23', label: 'Geriatria' },
  { value: '24', label: 'Ginecologia e Obstetrícia' },
  { value: '25', label: 'Hematologia e Hemoterapia' },
  { value: '26', label: 'Homeopatia' },
  { value: '27', label: 'Infectologia' },
  { value: '28', label: 'Mastologia' },
  { value: '29', label: 'Medicina de Emergência' },
  { value: '30', label: 'Medicina de Família e Comunidade' },
  { value: '31', label: 'Medicina do Trabalho' },
  { value: '32', label: 'Medicina de Tráfego' },
  { value: '33', label: 'Medicina Esportiva' },
  { value: '34', label: 'Medicina Física e Reabilitação' },
  { value: '35', label: 'Medicina Intensiva' },
  { value: '36', label: 'Medicina Legal e Perícia Médica' },
  { value: '37', label: 'Medicina Nuclear' },
  { value: '38', label: 'Medicina Preventiva e Social' },
  { value: '39', label: 'Nefrologia' },
  { value: '40', label: 'Neurocirurgia' },
  { value: '41', label: 'Neurologia' },
  { value: '42', label: 'Nutrologia' },
  { value: '43', label: 'Oftalmologia' },
  { value: '44', label: 'Oncologia Clínica' },
  { value: '45', label: 'Ortopedia e Traumatologia' },
  { value: '46', label: 'Otorrinolaringologia' },
  { value: '47', label: 'Patologia' },
  { value: '48', label: 'Patologia Clínica/Medicina Laboratorial' },
  { value: '49', label: 'Pediatria' },
  { value: '50', label: 'Psiquiatria' },
  { value: '51', label: 'Pneumologia' },
  { value: '52', label: 'Radiologia e Diagnóstico por Imagem' },
  { value: '53', label: 'Radioterapia' },
  { value: '54', label: 'Reumatologia' },
  { value: '55', label: 'Urologia' }
]

const DATA: IEntity = {
  id: '1',
  corporateName: 'Hydrogen',
  region: '5',
  active: true,
  medicalSpecialties: ['1', '2', '3'],
  cnpj: '42587462115358',
  openingDate: '2024-02-18',
  tradeName: 'H'
}

@Component({
  templateUrl: './manage-entity.component.html',
  styleUrls: ['./manage-entity.component.scss']
})
export class ManageEntityComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly service: EntityService
  ) {}

  public readonly form: FormGroup = this.buildForm()
  public readonly regions = REGION_DATA
  public readonly medicalSpecialties = MEDICAL_SPECIALTIES

  public loading = false
  public submitted = false
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
    this.submitted = true

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
          const action = this.id ? 'Editada' : 'Criada'
          const message = `Entidade ${action} com sucesso`

          this.snackBar.open(message, 'ok', {
            duration: 3 * 1000
          })

          this.goToList()
          this.loading = false
        },
        error: (err: HttpErrorResponse) => {
          const error = 'Ocorreu um erro inesperado. Tente novamente mais tarde'

          const message = err.error?.message ?? error

          this.snackBar.open(message, 'ok', {
            duration: 3 * 1000
          })
          this.loading = false
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
    this.router.navigate(['entity'])
  }

  public generateLabel(label: string): string {
    const labels: { [key: string]: string } = {
      corporateName: 'Razão Social',
      tradeName: 'Nome Fantasia',
      cnpj: 'CNPJ',
      region: 'Região',
      openingDate: 'Data de Inauguração ',
      active: 'Ativa',
      medicalSpecialties: 'Especialidades Médicas'
    }

    return labels[label]
  }

  private findOne(id: string): void {
    this.id = id

    this.form.patchValue(DATA)

    // this.loading = true
    // this.service.findOne(id).subscribe({
    //   next: data => {
    //     this.form.patchValue(data)
    //     this.loading = false
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     alert(err.error.massage)
    //     this.loading = false
    //   }
    // })
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
      medicalSpecialties: [[], [Validators.required]]
    })

    return form
  }

  public get formErrors(): any {
    if (!this.submitted) return null

    return FormUtils.formValid(this.form)
  }
}
