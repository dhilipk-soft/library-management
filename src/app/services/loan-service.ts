import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAddLoan, ILoanDisplay } from '../models/interface/ILoans';
import { Observable } from 'rxjs';
import { IBookWithMember } from '../models/interface/books';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getAllLoans():Observable<ILoanDisplay[]> {
    return this.http.get<ILoanDisplay[]>(environment.API_URL+'Loan');
  }

  createLoan(loan:IAddLoan) {
    return this.http.post(environment.API_URL+'Loan',loan);
  }

  deleteLoan(id: string){
    return this.http.delete(environment.API_URL+'Loan/'+`${id}`)
  }

  returnLoan(id: string){
    return this.http.put(environment.API_URL+'Loan/'+`${id}`, {})
  }

  
}
