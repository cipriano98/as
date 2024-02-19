import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, first } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IClinic, IClinicPagination, IClinicView } from '../models/entity.model'

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}/clinic`

  public create(body: IClinic): Observable<IClinic> {
    const url = `${this.url}`
    return this.http.post<IClinic>(url, body).pipe(first())
  }

  public update(id: string, body: Partial<IClinic>): Observable<IClinic> {
    const url = `${this.url}/${id}`
    return this.http.patch<IClinic>(url, body).pipe(first())
  }

  public getView(id: string): Observable<IClinicView> {
    const url = `${this.url}/${id}/view`
    return this.http.get<IClinicView>(url).pipe(first())
  }

  public findAll(queryParams: string): Observable<IClinicPagination> {
    const url = `${this.url}?${queryParams}`
    return this.http.get<IClinicPagination>(url).pipe(first())
  }

  public findOne(id: string): Observable<IClinic> {
    const url = `${this.url}/${id}`
    return this.http.get<IClinic>(url).pipe(first())
  }

  public remove(id: string): Observable<void> {
    const url = `${this.url}/${id}`
    return this.http.delete<void>(url).pipe(first())
  }
}
