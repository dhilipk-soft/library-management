import { ILoanMember } from "./ILoanMembers";
import { IMember } from "./IMembers";

export interface Book {
  bookId: string;
  title: string;
  author: string;
  publishedDate: string; // or Date if you're converting it
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
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