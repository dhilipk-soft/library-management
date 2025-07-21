import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ILoanDisplay } from '../../shared/models/interface/books';
import { IAddLoan } from '../../shared/models/interface/ILoans';

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
