import { Component, inject, OnInit, signal } from '@angular/core';
import { LoanService } from '../../services/loan-service';
import { IBookWithMember } from '../../models/interface/books';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILoanDisplay } from '../../models/interface/ILoans';

function parseDateString(dateStr: string): Date {
  const [day, month, yearTime] = dateStr.split('-');
  const [year, time] = yearTime.split(' ');
  return new Date(`${year}-${month}-${day}T${time}`);
}


@Component({
  selector: 'app-loans',
  imports: [ FormsModule, CommonModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css'
})
export class Loans implements OnInit{

  loanList = signal<IBookWithMember []>([])

  loanService = inject(LoanService)

  displayLoanList = signal<ILoanDisplay []>([])

  ngOnInit(): void {
      this.loadLoanMember()
  }

  loadLoanMember():void {
      this.loanService.getAllLoans().subscribe((data: IBookWithMember[]) => {
        this.loanList.set(data)
        const response = this.loanList().flatMap(
          book => book.members.map( member => ( {
            title: book.title,
            loanId:member.loanId,
            memberName: member.fullName,
            memberEmail: member.email,
            memberPhone: member.phone,
            issueDate: member.issueDate, 
            dueDate: member.dueTime,
            returnDate: member.returnDate
          }))
        )

        this.displayLoanList.set(response);
        console.log(this.displayLoanList());
      })
  }

  deleteLoan(id:string):void{
    this.loanService.deleteLoan(id).subscribe({
      next: (data) => {
        console.log(data);
        this.loadLoanMember()
      },
      error: (error) => {
        console.log(error);
      }
    })
    // console.log("delet")
    
  }

  

}
