import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, first } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IRegion } from '../models/region.model'

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}/region`

  public findAll(): Observable<IRegion[]> {
    const url = `${this.url}`
    return this.http.get<IRegion[]>(url).pipe(first())
  }

  public findOne(id: string): Observable<IRegion> {
    const url = `${this.url}/${id}`
    return this.http.get<IRegion>(url).pipe(first())
  }
}
