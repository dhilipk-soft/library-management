import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ILoginResponse } from '../../models/interface/loginResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor( private http: HttpClient){  }
  
  login(phone: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(environment.API_URL+'Auth/login', { phone, password });
  }

}
