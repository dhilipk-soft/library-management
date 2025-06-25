export interface Book {
  bookId: string;
  title: string;
  author: string;
  publishedDate: string; // or Date if you're converting it
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
}
