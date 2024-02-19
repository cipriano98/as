import { Sort } from '@angular/material/sort'

export interface IPagination<Entity> {
  data: Entity[]
  page: number
  pageSize: number
  totalItems: number
}

export interface IPaginationQuery {
  search: string
  sort: Sort
  pageEvent: IPaginationpageEvent
}

export interface IPaginationpageEvent {
  pageIndex: number
  pageSize: number
}
