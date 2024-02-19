import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, first } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IMedicalSpeciality } from '../models/medical-speciality.model'

@Injectable({
  providedIn: 'root'
})
export class MedicalSpecialityService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = `${environment.api}/medical-speciality`

  public findAll(): Observable<IMedicalSpeciality[]> {
    const url = `${this.url}`
    return this.http.get<IMedicalSpeciality[]>(url).pipe(first())
  }

  public findOne(id: string): Observable<IMedicalSpeciality> {
    const url = `${this.url}/${id}`
    return this.http.get<IMedicalSpeciality>(url).pipe(first())
  }
}
