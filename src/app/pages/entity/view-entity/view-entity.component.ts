import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { IClinicView } from '../models/entity.model'
import { ClinicService } from '../services/entity.service'

@Component({
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.scss']
})
export class ViewEntityComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly service: ClinicService
  ) {}

  public entity!: IClinicView
  public loading = false
  public submitted = false
  public id?: string

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: param => {
        const { id } = param
        id && this.getView(id)
      }
    })
  }

  public goToList(): void {
    this.router.navigate(['clinic'])
  }

  public goToEdit(): void {
    this.router.navigate(['clinic', this.id])
  }

  private getView(id: string): void {
    this.id = id
    this.loading = true
    this.service.getView(id).subscribe({
      next: data => {
        this.entity = data
        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false
        const message = err.error?.message ?? 'Ocorreu um erro inesperado'
        this.snackBar.open(message, 'ok', { duration: 3000 })
        this.goToList()
      }
    })
  }
}
