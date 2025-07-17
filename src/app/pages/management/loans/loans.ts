import { Component, inject, OnInit, signal } from '@angular/core';
import { LoanService } from '../../../services/management/loan-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILoanDisplay } from '../../../models/interface/ILoans';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loans',
  imports: [ FormsModule, CommonModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css'
})
export class Loans implements OnInit{

  loanList = signal<ILoanDisplay []>([])
  displayLoanList = signal<ILoanDisplay []>([])

  constructor(private toastr: ToastrService, private loanService: LoanService) {
  }

  ngOnInit(): void {
      this.loadLoanMember()
  }

 loadLoanMember(): void {
  this.loanService.getAllLoans().subscribe({
    next: (data: ILoanDisplay[]) => {
      this.loanList.set(data);
      this.displayLoanList.set(data); // Directly use the flat list
      console.log(this.loanList());
    },
    error: (err) => {
      console.error('Failed to load loans:', err);
    }
  });
}

  deleteLoan(id:string):void{
    this.loanService.deleteLoan(id).subscribe({
      next: (data) => {
        console.log(data);
        alert("successfully deleted....")
        this.loadLoanMember()
      },
      error: (error) => {
        console.log(error);
      }
    })
    // console.log("delet")
    
  }

  returnLoan(id: string){
    this.loanService.returnLoan(id).subscribe({
      next: (data) => {
        console.log(data);
        alert("successfully returned....")
        this.loadLoanMember();
      },
       error: err => {
        console.log(err)
    if (err.status === 400 || err.status === 404) {
      alert(err.error.message);
    } else {
      alert('Unexpected error occurred.');
    }
  }
    })
  }
}
