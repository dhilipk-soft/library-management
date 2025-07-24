// IAddLoan.ts
export interface IAddLoan {
  bookId: string;
  memberId: string;
  dueTime: string; // ISO format date string: "2025-06-24T00:00:00"
}

export interface ILoan {

}

export interface ILoanDisplay {
  loanId: string;
  bookId: string;
  title: string;
  author: string;
  memberId: string;
  fullName: string;
  email: string;
  phone: string;
  issueDate: string;   // or Date
  dueTime: string;     // or Date
  returnDate: string | null;
}
