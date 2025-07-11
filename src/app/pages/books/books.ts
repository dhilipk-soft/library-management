import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Book } from '../../models/class/books';
import { signal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';
import { Categories } from '../../components/categories/categories';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/class/categories';
import { CategoryService } from '../../services/categorie-service';
import { MemberService } from '../../services/member-service';
import { IMember } from '../../models/interface/IMembers';
import { AddLoan } from '../../models/class/loans';
import { LoanService } from '../../services/loan-service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LibraryService } from '../../services/library-service';
import { ILibraryDetail } from '../../models/interface/ILibrary';
import { BookFormModel, UpdateBook } from '../../models/interface/books';

import { FormGroup, FormBuilder, Validator } from '@angular/forms';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    Categories,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  memberList = signal<IMember[]>([]);
  availableBookList = signal<Book[]>([]);
  bookList = signal<Book[]>([]);
  filterBookList = signal<Book[]>([]);
  categoryList = signal<Category[]>([]);
  libraryList = signal<ILibraryDetail[]>([]);

  reserverPopup = false;
  editBook = false;
  editBookId: string | null = null;
  newBook: Book = new Book();
  selectedBookId: string | null = null;
  selectedMemberId: string | null = null;
  
  bookForm!: FormGroup;


  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private fb: FormBuilder
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
    this.formGenerate();
  }

  formGenerate():void {
    this.bookForm = this.fb.group({
      title: this.fb.control('',[Validators.required, Validators.min(5)]),
      author: this.fb.control('',[Validators.required]),
      totalCopies: this.fb.control<number>(0, [Validators.required]),
      categoryId: this.fb.control('', [Validators.required]),
      libraryId: this.fb.control('', [Validators.required]),
    })
  }

  loadLibraryName(): void {
    this.libraryService.getAllLibrariesName().subscribe((data) => {
      this.libraryList.set(data);
      console.log(this.libraryList());
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
      this.bookList.set(data);
      this.filterBookList.set(data);
      console.log();
    });
  }

  //load category to categoryList
  loadCategories(): void {
    this.CategoryService.getAllCategories().subscribe((data) => {
      this.categoryList.set(data);
      console.log(this.filterBookList());
    });
  }

  //filter book based on category
  handleFilterBooks(categoryId: string): void {
    if (!categoryId) {
      this.filterBookList.set(this.bookList());
    } else {
      this.filterBookList.set(
        this.bookList().filter((book) => book.categoryId === categoryId)
      );
    }
  }

  handleFilterLibraries(libraryId: string): void {
    if (!libraryId) {
      this.filterBookList.set(this.bookList());
    } else {
      this.filterBookList.set(
        this.bookList().filter((book) => book.libraryId === libraryId)
      );
    }
  }

  cancelAddBook() {
    this.editBook = false;
    this.editBookId = '';
    this.newBook = new Book();
    this.resetForm()
  }

  //addBook
  addBook(): void {
    if (this.editBook) {
      this.saveUpdate();
      console.log('update');
      return;
    }

    // if (this.bookForm.valid)
    //   console.log('hai');
    this.bookService.addBook(this.bookForm.value).subscribe({
      next: () => {
        this.loadBooks();
        this.resetForm()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateBook(id: string) {
    const getBook = this.bookList().find((book) => book.id === id);

    console.log(getBook)
    if (!getBook) {
      alert('Book not found');
      return;
    }

    this.newBook = { ...getBook };
    this.bookForm.patchValue({
      title:this.newBook.title,
      author:this.newBook.author,
      totalCopies:this.newBook.totalCopies,
      categoryId:this.newBook.categoryId,
      libraryId:this.newBook.libraryId
    })
    this.editBook = true;
    this.editBookId = id;
  }

  saveUpdate(): void {
    console.log('update2');

    if (!this.editBookId) return;

    const updateBook: UpdateBook = {
      bookId: this.newBook.id,
      title: this.bookForm.get('title')?.value,
      author: this.bookForm.get('author')?.value,
      totalCopies: Number(this.bookForm.get('totalCopies')?.value),
      availableCopies: Number(this.newBook.availableCopies+Number(this.bookForm.get('totalCopies')?.value - this.newBook.totalCopies)),
      categoryId: this.bookForm.get('categoryId')?.value,
      libraryId: this.bookForm.get('libraryId')?.value,
    };
    console.log(updateBook);

    this.bookService.updateBook(updateBook).subscribe({
      next: () => {
        this.loadBooks();
        this.newBook = new Book();
        this.editBook = false;
        this.editBookId = null;
        this.resetForm()
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

  resetForm(): void {
  this.bookForm.reset();
  this.bookForm.markAsPristine();
  this.bookForm.markAsUntouched();
  this.bookForm.updateValueAndValidity();
}
}

