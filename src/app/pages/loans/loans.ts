import { Component, inject, OnInit, signal } from '@angular/core';
import { LoanService } from '../../services/loan-service';
import { IBookWithMember } from '../../models/interface/books';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loans',
  imports: [ FormsModule, CommonModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css'
})
export class Loans implements OnInit{

  loanList = signal<IBookWithMember []>([])

  loanService = inject(LoanService)

  ngOnInit(): void {
      this.loadLoanMember()
  }

  loadLoanMember():void {
      this.loanService.getAllLoans().subscribe((data: IBookWithMember[]) => {
        this.loanList.set(data)
        console.log(this.loanList())
      })
  }

}
