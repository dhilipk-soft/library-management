import {
  Component,
  inject,
  Output,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { OnInit } from '@angular/core';
import { Book } from '../../../models/class/books';
import { signal } from '@angular/core';
import { BookService } from '../../../services/management/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/management/categorie-service';
import { MemberService } from '../../../services/management/member-service';
import { IMember } from '../../../models/interface/IMembers';
import { AddLoan } from '../../../models/class/loans';
import { LoanService } from '../../../services/management/loan-service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LibraryService } from '../../../services/management/library-service';
import { ILibraryDetail } from '../../../models/interface/ILibrary';
import { IBook, UpdateBook } from '../../../models/interface/books';

import { Categories } from '../../../shared/categories/categories';
import { BookForm } from '../../../shared/book-form/book-form';
import { ICategory } from '../../../models/interface/ICategories';
import { ToolBar } from '../../../shared/tool-bar/tool-bar';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipe } from '../../../pipes/filter-pipe';

@Component({
  selector: 'app-books',
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BookForm,
    ToolBar,
    MatIconModule,
    FilterPipe,
  ],
  templateUrl: './books.html',
  styleUrl: './books.css',
  encapsulation: ViewEncapsulation.None,
})
export class Books implements OnInit {
  memberList = signal<IMember[]>([]);
  availableBookList = signal<Book[]>([]);
  bookList = signal<Book[]>([]);
  filterBookList = signal<Book[]>([]);
  categoryList = signal<ICategory[]>([]);
  libraryList = signal<ILibraryDetail[]>([]);
  searchText: string = '';
  role: string = '';

  reserverPopup = false;
  editBook = false;
  editBookId: string | null = null;
  newBook: Book = new Book();
  bookData: Book = new Book();
  selectedBookId: string | null = null;
  selectedMemberId: string | null = null;

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService
  ) {}

  CategoryService = inject(CategoryService);
  memberService = inject(MemberService);
  loanService = inject(LoanService);
  newLoan: AddLoan = new AddLoan();

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.loadMember();
    this.loadLibraryName();
    this.handleRole()
  }

  loadLibraryName(): void {
    this.libraryService.getAllLibrariesName().subscribe((data) => {
      this.libraryList.set(data);
    });
  }

  reserveBook(id: string): void {
    this.newLoan.bookId = id;
    this.reserverPopup = true;
    this.handleAvailableBooks();
  }

  handleAvailableBooks(): void {
    this.availableBookList.set(
      this.bookList().filter((book) => book.availableCopies > 0)
    );
  }

  handleReserve(from: NgForm) {
    this.loanService.createLoan(this.newLoan).subscribe({
      next: () => {
        this.reserverPopup = false;
        this.newLoan = new AddLoan();
        from.resetForm();
        this.loadBooks();
        alert('Reservation successful!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  loadMember(): void {
    this.memberService.getAllMembers().subscribe((data) => {
      this.memberList.set(data);
    });
  }
  //load data to bookList
  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      const formattedData = data.map(book => {
      return {
        ...book,
        publishDate: this.convertToDate(book.publishDate).toISOString(), // optional: keep as Date or ISO string
      };
    });
      this.bookList.set(formattedData);
      this.filterBookList.set(formattedData);
    });
  }

  private convertToDate(dateStr: string): Date {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('-');
  return new Date(`${year}-${month}-${day}T${timePart}`);
}
  //load category to categoryList
  loadCategories(): void {
    this.CategoryService.getAllCategories().subscribe((data) => {
      this.categoryList.set(data);
    });
  }

  handleFilter(event: { categoryId: string; libraryId: string }) {
    const { categoryId, libraryId } = event;

    const filteredBooks = this.bookList().filter((book) => {
      const matchCategory = categoryId ? book.categoryId === categoryId : true;
      const matchLibrary = libraryId ? book.libraryId === libraryId : true;
      return matchCategory && matchLibrary;
    });

    this.filterBookList.set(filteredBooks);
  }

  cancelAddBook() {
    this.editBook = false;
    this.editBookId = '';
    this.newBook = new Book();
  }

  //addBook
  addBook(formData: Book): void {
    // debugger
    if (this.editBook) {
      this.saveUpdate(formData);
      return;
    }

    this.bookService.addBook(formData).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateBook(id: string) {
    const getBook = this.bookList().find((book) => book.id === id);

    console.log('get');
    console.log(getBook);
    if (!getBook) {
      alert('Book not found');
      return;
    }

    this.newBook = { ...getBook };
    this.bookData = { ...getBook };
    this.editBook = true;
    this.editBookId = id;
  }

  saveUpdate(formData: Book): void {
    // console.log('update');
    // debugger
    if (!this.editBookId) return;

    const updateBook: UpdateBook = {
      title: formData.title,
      author: formData.author,
      totalCopies: Number(formData.totalCopies),
      availableCopies: Number(
        this.newBook.availableCopies +
          Number(formData.totalCopies - this.newBook.totalCopies)
      ),
      categoryId: formData.categoryId,
      libraryId: formData.libraryId,
    };
    console.log('update');
    console.log(updateBook);

    this.bookService.updateBook(updateBook, this.bookData.id).subscribe({
      next: () => {
        this.loadBooks();
        this.newBook = new Book();
        this.bookData = new Book();
        this.editBook = false;
        this.editBookId = null;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCategoryName(arg0: string): string {
    return (
      this.categoryList().find((category) => category.categoryId === arg0)
        ?.categoryName || ''
    );
  }

  handleRole():void {
    
    const token = localStorage.getItem('accessToken')
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
           console.log("Role:", this.role);
        }

  }
}
