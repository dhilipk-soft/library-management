import { ILoanMember } from "./ILoanMembers";

export interface IBook {
  bookId: string;
  title: string;
  author: string;
  publishedDate: string; // or Date if you're converting it
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
  libraryId: string;
}

export interface IBookWithMember {
  bookId: string;
  title: string;
  author: string;
  publishDate: string; // or Date
  totalCopies: number;
  availableCopies: number;
  members: ILoanMember[];
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

  issueDate: string;    
  dueTime: string;      
  returnDate: string | null;
}

export interface UpdateBook{
  title: string;
  author: string;
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
  libraryId: string;
}

export interface BookFormModel {
  title: string;
  author: string;
  publishDate: Date;
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
  libraryId: string;
}