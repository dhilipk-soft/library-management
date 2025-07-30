import { Component, inject, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Book } from '../../../shared/models/class/books';
import { signal } from '@angular/core';
import { BookService } from '../../../services/management/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/management/categorie-service';
import { MemberService } from '../../../services/management/member-service';
import { IMember } from '../../../shared/models/interface/IMembers';
import { AddLoan } from '../../../shared/models/class/loans';
import { LoanService } from '../../../services/management/loan-service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LibraryService } from '../../../services/management/library-service';
import { ILibraryDetail } from '../../../shared/models/interface/ILibrary';
import { IBook, UpdateBook } from '../../../shared/models/interface/books';

import { BookForm } from './book-form/book-form';
import { ICategory } from '../../../shared/models/interface/ICategories';
import { ToolBar } from '../../../shared/tool-bar/tool-bar';
import { MatIconModule } from '@angular/material/icon';
import { Pagination } from '../../../shared/pagination/pagination';
import { MatTableModule } from '@angular/material/table';
import { Auth } from '../../../services/Auth/auth';
import { Router } from '@angular/router';

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
    Pagination,
    MatTableModule,
    MatButtonModule,
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
  displayBookList = signal<Book[]>([]);

  bookPaginationSize: number = 6;
  memberPhone: string = '';
  disableReturn: boolean = false;
  memberDetail: IMember | undefined;
  selectedCategoryId: string = '';
  selectedLibraryId: string = '';
  searchText: string = '';
  role: string = '';
  totalPageCount: number = 0;
  currentPage: number = 1;
  fromPage: number = 1;
  toPage: number = 1;
  loginStatus: boolean = false;

  reserverPopup = false;
  editBook = false;
  editBookId: string | null = null;
  newBook: Book = new Book();
  bookData: Book = new Book();

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private authService: Auth,
    private router: Router
  ) {
    this.loginStatus = this.authService.isLoggedIn();
  }

  CategoryService = inject(CategoryService);
  memberService = inject(MemberService);
  loanService = inject(LoanService);
  newLoan: AddLoan = new AddLoan();

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.loadMember();
    this.loadLibraryName();
    this.handleRole();
    this.loadMemberDetails();
  }

  loadLibraryName(): void {
    this.libraryService.getAllLibrariesName().subscribe((data) => {
      this.libraryList.set(data);
    });
  }

  reserveBook(id: string): void {
    if (!this.loginStatus) this.router.navigate(['/login']);
    this.newLoan.bookId = id;
    this.newLoan.memberId = this.memberDetail?.memberId ?? '';
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

  loadMemberDetails(): void {
    // if (this.loginStatus)
    //   this.memberService
    //     .getMemberDetailByPhone(this.memberPhone)
    //     .subscribe((data) => {
    //       this.memberDetail = data;
    //     });
  }

  //load data to bookList
  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      const formattedData = data.map((book) => {
        return {
          ...book,
          publishDate: this.convertToDate(book.publishDate).toISOString(), // optional: keep as Date or ISO string
        };
      });
      this.bookList.set(formattedData);
      this.filterBookList.set(formattedData);
      this.filterPagesList(1, this.bookPaginationSize);
      this.totalPageCount =
        Math.floor(formattedData.length / this.bookPaginationSize) +
        (formattedData.length % this.bookPaginationSize > 0 ? 1 : 0);
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

  //show page list based on count
  currentPageChange(current: number) {
    this.fromPage = (current - 1) * this.bookPaginationSize + 1;
    this.toPage = current * this.bookPaginationSize;
    if (this.toPage > this.filterBookList().length) {
      this.toPage = this.filterBookList().length;
    }
    this.filterPagesList(this.fromPage, this.toPage);
  }

  //here filter booklist based on range store in filterlist
  filterPagesList(from: number, to: number) {
    this.displayBookList.set(this.filterBookList().slice(from - 1, to));
  }

  onFilterChanges(event: {
    search: string;
    category: string;
    library: string;
  }) {
    console.log(
      'search ' +
        event.search +
        '  category' +
        event.category +
        ' library' +
        event.library
    );
    this.searchText = event.search;
    this.selectedCategoryId = event.category;
    this.selectedLibraryId = event.library;
    this.applyFilterAndPagination();
  }

  applyFilterAndPagination() {
    this.searchText = this.searchText.toLowerCase().trim();
    const filteredBooks = this.bookList().filter(
      (book) =>
        (!this.selectedCategoryId ||
          book.categoryId === this.selectedCategoryId) &&
        (!this.selectedLibraryId ||
          book.libraryId === this.selectedLibraryId) &&
        (book.author.toLowerCase().includes(this.searchText) ||
          book.title.toLowerCase().includes(this.searchText))
    );

    this.filterBookList.set(filteredBooks);

    console.log(this.filterBookList());

    this.totalPageCount =
      Math.floor(this.filterBookList().length / this.bookPaginationSize) +
      (this.filterBookList().length % this.bookPaginationSize > 0 ? 1 : 0);
    this.currentPage = 1;
    this.currentPageChange(1);
  }

  cancelAddBook() {
    this.editBook = false;
    this.editBookId = '';
    this.newBook = new Book();
  }

  //addBook
  addBook(formData: Book): void {
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

  handleRole(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.role =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.memberPhone =
        payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'
        ];
      // console.log(payload);
      // console.log(this.memberPhone);
      this.disableReturn = this.role === 'admin';
    }
  }

  nextPage() {
    if (this.currentPage + 1 <= this.totalPageCount) this.currentPage++;
  }
  previousPage() {
    if (this.currentPage - 1 > 0) this.currentPage--;
  }
  firstPage() {
    this.currentPage = 1;
  }
  lastPage() {
    this.currentPage = this.totalPageCount;
  }
}
