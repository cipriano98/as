export interface IEntity {
  id?: string
  corporateName: string
  tradeName: string
  cnpj: string
  region: string
  openingDate: string
  active: boolean
  medicalSpecialties: string[]
}

export interface IEntityView {
  id: string
  corporateName: string
  region: string
  medicalSpecialties: string[]
  active: string
}
