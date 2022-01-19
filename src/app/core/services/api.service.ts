import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Doc } from '../models/doc.interface';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getDocumentTypes(): Observable<Array<Doc>>{
    return this.http.get<Array<Doc>>(`${environment.API}/signup/documentTypes`);
  }

  public getgenders(): Observable<Array<Gender>> {
    return this.http.get<Array<Gender>>(`${environment.API}/signup/genders`)
  }

  public sendVerificationNumber(data): Observable<any> {
    return this.http.post<any>(`${environment.API}/signup/sendSmsVerificationNumber`,
    { "payload": data });
  }
  
}