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

;[
  { value: 'uuid', label: 'Alto tietê' },
  { value: 'uuid', label: 'Interior' },
  { value: 'uuid', label: 'ES' },
  { value: 'uuid', label: 'SP Interior' },
  { value: 'uuid', label: 'SP' },
  { value: 'uuid', label: 'SP2' },
  { value: 'uuid', label: 'MG' },
  { value: 'uuid', label: 'Nacional' },
  { value: 'uuid', label: 'SP CAV' },
  { value: 'uuid', label: 'RJ' },
  { value: 'uuid', label: 'SP2' },
  { value: 'uuid', label: 'SP1' },
  { value: 'uuid', label: 'NE1' },
  { value: 'uuid', label: 'NE2' },
  { value: 'uuid', label: 'SUL' },
  { value: 'uuid', label: 'Norte' }
]
