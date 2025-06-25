import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAddLoan } from '../models/interface/ILoans';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getAllLoans() {
    return this.http.get(environment.API_URL+'Loan');
  }

  createLoan(loan:IAddLoan) {
    return this.http.post(environment.API_URL+'Loan',loan);
  }

  
}
