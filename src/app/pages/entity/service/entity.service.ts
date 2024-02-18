import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IEntity } from '../models/entity.model'

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}/register`

  public create(body: IEntity): Observable<IEntity> {
    const url = `${this.url}/entity`
    return this.http.post<IEntity>(url, body).pipe(take(1))
  }

  public update(id: string, body: IEntity): Observable<IEntity> {
    const url = `${this.url}/collaborator/${id}`
    return this.http.patch<IEntity>(url, body).pipe(take(1))
  }

  public findAll(): Observable<IEntity[]> {
    const url = `${this.url}/collaborator`
    return this.http.get<IEntity[]>(url).pipe(take(1))
  }

  public findOne(id: string): Observable<IEntity> {
    const url = `${this.url}/collaborator/${id}`
    return this.http.get<IEntity>(url).pipe(take(1))
  }
}
