import { IPagination } from 'src/app/shared/pagination/models/pagination.model'

export interface IClinic {
  id?: string
  corporateName: string
  tradeName: string
  cnpj: string
  region: string
  openingDate: string
  medicalSpecialities: string[]
  active: boolean
}

export interface IClinicView {
  id: string
  openingDate: string
  corporateName: string
  region: string
  tradeName: string
  cnpj: string
  medicalSpecialities: string[]
  active: string
}

export type IClinicPagination = IPagination<IClinicView>
