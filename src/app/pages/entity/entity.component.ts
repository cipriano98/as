import { Location } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { PageEvent } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Sort } from '@angular/material/sort'
import { ActivatedRoute, Router } from '@angular/router'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  tap
} from 'rxjs/operators'
import { IPaginationQuery } from 'src/app/shared/pagination/models/pagination.model'
import { IClinicPagination } from './models/entity.model'
import { ClinicService } from './services/entity.service'

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class ClinicComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly service: ClinicService
  ) {}

  public readonly search = new FormControl('')
  public readonly displayedColumns = [
    'corporateName',
    'region',
    'medicalSpecialities',
    'active',
    'actions'
  ]
  public readonly paginationQuery: IPaginationQuery = {
    search: '',
    sort: {
      active: 'corporateName',
      direction: 'asc'
    },
    pageEvent: {
      pageIndex: 0,
      pageSize: 5
    }
  }

  public clinicPagination!: IClinicPagination
  public loading = false

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(query => {
      if (query['page']) {
        const { search, direction, page, pageSize, sort: active } = query
        const pageIndex = page - 1

        this.search.setValue(search)

        this.paginationQuery.search = search
        this.paginationQuery.sort = { active, direction }
        this.paginationQuery.pageEvent = { pageIndex, pageSize }
      }
    })

    this.findAll()
    this.reactiveSearch()
  }

  public sort(sort: Sort): void {
    this.paginationQuery.sort = sort
    this.findAll()
  }

  public changePage(pageEvent: PageEvent): void {
    this.paginationQuery.pageEvent = {
      ...pageEvent
    }

    this.findAll()
  }

  public findAll(): void {
    this.loading = true

    this.service
      .findAll(this.generateQuery)
      .pipe(
        finalize(() => {
          this.loading = false

          setTimeout(() => {
            const search = document.getElementById('search')
            search?.focus()
          }, 0.1)
        })
      )
      .subscribe({
        next: paginationClinics => {
          this.clinicPagination = paginationClinics
        },
        error: (err: HttpErrorResponse) => {
          const message = err.error?.message ?? 'Ocorreu um erro inesperado'
          this.snackBar.open(message, 'ok', { duration: 3000 })
        }
      })
  }

  public addNew(): void {
    this.goTo('new')
  }

  public edit(id: string): void {
    this.goTo(id)
  }

  public view(id: string): void {
    this.goTo(id, 'view')
  }

  private goTo(...path: string[]): void {
    this.router.navigate(['clinic', ...path])
  }

  private reactiveSearch(): void {
    this.search.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => {
          return value.length >= 3 || value.length === 0
        }),
        distinctUntilChanged(),
        debounceTime(500),
        tap(value => {
          this.paginationQuery.search = value
          this.findAll()
        })
      )
      .subscribe()
  }

  private get generateQuery(): string {
    const generateQueryParams = (toLocation: boolean = false): string => {
      const { search, sort, pageEvent } = this.paginationQuery
      const searchQueryParam = search ? `search=${search}&` : ''

      const sortQueryParams = sort.direction
        ? `&sort=${sort.active}&direction=${sort.direction}`
        : ''

      const page = toLocation ? pageEvent.pageIndex + 1 : pageEvent.pageIndex
      const pageQueryParams = `page=${page}&pageSize=${pageEvent.pageSize}`

      const queryParams = searchQueryParam + pageQueryParams + sortQueryParams
      return queryParams
    }

    this.location.go('clinic', generateQueryParams(true))

    return generateQueryParams()
  }
}
