import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAddLoan } from '../models/interface/ILoans';
import { Observable } from 'rxjs';
import { IBookWithMember } from '../models/interface/books';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getAllLoans():Observable<IBookWithMember[]> {
    return this.http.get<IBookWithMember[]>(environment.API_URL+'Loan');
  }

  createLoan(loan:IAddLoan) {
    return this.http.post(environment.API_URL+'Loan',loan);
  }

  deleteLoan(id: string){
    return this.http.delete(environment.API_URL+'Loan/'+`${id}`)
  }

  
}
