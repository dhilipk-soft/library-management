import { IMember } from "../interface/IMembers";

export class Book {
  id: string; 
  title: string;
  author: string;
  publishDate: string; 
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
  libraryId: string;

  constructor() {
    this.id = '';
    this.title = '';
    this.author = '';
    this.publishDate ='', // or new Date().toISOString() if you use Date
    this.totalCopies = 0;
    this.availableCopies = 0;
    this.categoryId = '';
    this.libraryId = '';
  }
}

export class NewUpdateBook {
   bookId: string;
  title: string;
  author: string;
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
  libraryId: string;

  constructor() {
    this.bookId = '';
    this.title = '';
    this.author = '';
    this.totalCopies = 0;
    this.availableCopies = 0;
    this.categoryId = '';
    this.libraryId = '';
  }
}

export class BookWithMember {
  bookId: string;
  title: string;
  author: string;
  publishDate: string; // use Date if you prefer
  totalCopies: number;
  availableCopies: number;
  members: IMember[];

  constructor() {
    this.bookId = '';
    this.title = '';
    this.author = '';
    this.publishDate = '';
    this.totalCopies = 0;
    this.availableCopies = 0;
    this.members = [];
  }
}