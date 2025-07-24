import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ILoginResponse } from '../../shared/models/interface/loginResponse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  private tokenKey = 'accessToken';
  private loggedStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getStatus(): Observable<boolean> {
    return this.loggedStatus.asObservable();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return Math.floor(Date.now() / 1000) < expiry;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  login(phone: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(environment.API_URL + 'Auth/login', {
      phone,
      password,
    });
  }
}
