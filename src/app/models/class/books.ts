export class Book {
  bookId: string;
  title: string;
  author: string;
  publishDate: string; // use Date if you prefer
  totalCopies: number;
  availableCopies: number;
  id: string;
  categoryId: string;

  constructor() {
    this.bookId = '';
    this.title = '';
    this.author = '';
    this.publishDate = ''; // or new Date().toISOString() if you use Date
    this.totalCopies = 0;
    this.availableCopies = 0;
    this.id = '';
    this.categoryId = '';
  }
}
