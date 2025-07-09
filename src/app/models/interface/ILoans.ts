// IAddLoan.ts
export interface IAddLoan {
  bookId: string;
  memberId: string;
  dueTime: string; // ISO format date string: "2025-06-24T00:00:00"
}

export interface ILoan {

}

export interface ILoanDisplay {
  title: string;
  loanId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  issueDate: string;     // use `Date` if you're working with actual Date objects
  dueDate: string;
  returnDate: string;
}
