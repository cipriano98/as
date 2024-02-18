import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, map, startWith } from 'rxjs'
import { IEntityView } from './models/entity.model'

const MEDICAL_SPECIALTIES: string[] = [
  'Acupuntura',
  'Alergia e Imunologia',
  'Anestesiologista'
  // 'Angiologia',
  // 'Cardiologia',
  // 'Cirurgia Cardiovascular',
  // 'Cirurgia da Mão',
  // 'Cirurgia de Cabeça e Pescoço',
  // 'Cirurgia do Aparelho Digestivo',
  // 'Cirurgia Geral',
  // 'Cirurgia Oncológica',
  // 'Cirurgia Pediátrica',
  // 'Cirurgia Plástica',
  // 'Cirurgia Torácica',
  // 'Cirurgia Vascular',
  // 'Clínica Médica',
  // 'Coloproctologia',
  // 'Dermatologia',
  // 'Endocrinologia e Metabologia',
  // 'Endoscopia',
  // 'Gastroenterologia',
  // 'Genética Médica',
  // 'Geriatria',
  // 'Ginecologia e Obstetrícia',
  // 'Hematologia e Hemoterapia',
  // 'Homeopatia',
  // 'Infectologia',
  // 'Mastologia',
  // 'Medicina de Emergência',
  // 'Medicina de Família e Comunidade',
  // 'Medicina do Trabalho',
  // 'Medicina de Tráfego',
  // 'Medicina Esportiva',
  // 'Medicina Física e Reabilitação',
  // 'Medicina Intensiva',
  // 'Medicina Legal e Perícia Médica',
  // 'Medicina Nuclear',
  // 'Medicina Preventiva e Social',
  // 'Nefrologia',
  // 'Neurocirurgia',
  // 'Neurologia',
  // 'Nutrologia',
  // 'Oftalmologia',
  // 'Oncologia Clínica',
  // 'Ortopedia e Traumatologia',
  // 'Otorrinolaringologia',
  // 'Patologia',
  // 'Patologia Clínica/Medicina Laboratorial',
  // 'Pediatria',
  // 'Pneumologia',
  // 'Psiquiatria',
  // 'Radiologia e Diagnóstico por Imagem',
  // 'Radioterapia',
  // 'Reumatologia',
  // 'Urologia'
]

const ELEMENT_DATA: IEntityView[] = [
  {
    id: '1',
    corporateName: 'Hydrogen',
    region: 'H',
    active: 'Não',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '2',
    corporateName: 'Helium',
    region: 'He',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '3',
    corporateName: 'Lithium',
    region: 'Li',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '4',
    corporateName: 'Beryllium',
    region: 'Be',
    active: 'Não',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '5',
    corporateName: 'Boron',
    region: 'B',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '6',
    corporateName: 'Carbon',
    region: 'C',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '7',
    corporateName: 'Nitrogen',
    region: 'N',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '8',
    corporateName: 'Oxygen',
    region: 'O',
    active: 'Não',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '9',
    corporateName: 'Fluorine',
    region: 'F',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  },
  {
    id: '10',
    corporateName: 'Neon',
    region: 'Ne,',
    active: 'Sim',
    medicalSpecialties: MEDICAL_SPECIALTIES
  }
]

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent {
  constructor(private readonly router: Router) {}
  public readonly filter = new FormControl('')
  public readonly list$: Observable<IEntityView[]> = this.startFilter()

  public loading = false

  private list = ELEMENT_DATA

  public addNew(): void {
    this.goTo('new')
  }

  public view(id: string): void {
    this.goTo(id)
  }

  public edit(id: string): void {
    this.goTo(id)
  }

  private goTo(path: string): void {
    this.router.navigate(['entity', path])
  }

  private startFilter(): Observable<IEntityView[]> {
    return this.filter.valueChanges.pipe(
      startWith(''),
      map(text => {
        const search = this.list.filter(data => {
          const term = text.toLowerCase()

          return (
            data.corporateName.toString().toLowerCase().includes(term) ||
            data.region.toString().toLowerCase().includes(term) ||
            data.medicalSpecialties.toString().toLowerCase().includes(term) ||
            data.active.toString().toLowerCase().includes(term)
          )
        })

        return search
      })
    )
  }
}
