import { Component, inject, OnInit, signal } from '@angular/core';
import { LoanService } from '../../../services/management/loan-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILoanDisplay } from '../../../shared/models/interface/ILoans';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loans',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})
export class Loans implements OnInit {
  loanList = signal<ILoanDisplay[]>([]);
  displayLoanList = signal<ILoanDisplay[]>([]);
  role: string = '';
  memberPhone: string = '';
  memberId: any;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.handleRole();
  }

  loadLoanMember(): void {
    this.loanService.getAllLoans().subscribe({
      next: (data: ILoanDisplay[]) => {
        this.loanList.set(data);
        this.displayLoanList.set(data); // Directly use the flat list
        // console.log(this.loanList());
      },
      error: (err) => {
        console.error('Failed to load loans:', err);
      },
    });
  }

  loadLoanMemberById(id: string): void {
    this.loanService.getLoanById(id).subscribe({
      next: (data: ILoanDisplay[]) => {
        this.loanList.set(data);
        this.displayLoanList.set(data);
        console.log(this.loanList());
      },
      error: (err) => {
        console.error('Failed to load loans:', err);
      },
    });
  }

  deleteLoan(id: string): void {
    this.loanService.deleteLoan(id).subscribe({
      next: (data) => {
        console.log(data);
        alert('successfully deleted....');
        this.loadLoanData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  returnLoan(id: string) {
    this.loanService.returnLoan(id).subscribe({
      next: (data) => {
        console.log(data);
        alert('successfully returned....');
        this.loadLoanData();
      },
      error: (err) => {
        console.log(err);
        if (err.status === 400 || err.status === 404) {
          alert(err.error.message);
        } else {
          alert('Unexpected error occurred.');
        }
      },
    });
  }

  handleRole(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.role =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.memberPhone =
        payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'
        ];

      this.memberId =
        payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      // console.log(payload);
      // console.log(this.memberPhone);
      this.loadLoanData();
    }
  }

  loadLoanData() {
    if (this.role === 'admin') {
      this.loadLoanMember();
    } else {
      this.loadLoanMemberById(this.memberId);
    }
  }
}
