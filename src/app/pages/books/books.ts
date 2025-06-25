
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Book } from '../../models/class/books';
import { signal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';
import {Categories} from '../../components/categories/categories'
import { FormsModule, NgForm } from '@angular/forms';
import {Category} from '../../models/class/categories'
import { CategoryService } from '../../services/categorie-service';import { MemberService } from '../../services/member-service';
import { IMember } from '../../models/interface/IMembers';
import { AddLoan } from '../../models/class/loans';
import { LoanService } from '../../services/loan-service';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, CommonModule,Categories ],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {

  memberList = signal<IMember []>([]);
  reserverPopup = false;
  editBook = false;
  editBookId: string | null = null;
  availableBookList = signal<Book[]>([]);
  bookList = signal<Book[]>([]); 
  newBook: Book = new Book();
  filterBookList = signal<Book[]>([])
  categoryList = signal<Category []> ([]);
  selectedBookId: string | null = null;
  selectedMemberId: string | null = null;
  constructor( private bookService: BookService) {}
  CategoryService = inject(CategoryService);
  memberService = inject(MemberService);
  loanService = inject(LoanService);
  newLoan :AddLoan = new AddLoan();

  ngOnInit(): void{
    this.loadBooks();
    this.loadCategories();
    this.loadMember();
  }

  reserveBook(id: string): void{
    this.newLoan.bookId = id;
    this.reserverPopup = true;
    this.handleAvailableBooks();
  }

  handleAvailableBooks():void {
    this.availableBookList.set(this.bookList().filter( book => book.availableCopies > 0))
  }

  handleReserve(from : NgForm){
    this.loanService.createLoan(this.newLoan).subscribe({
      next:()=>{
        this.reserverPopup = false;
        this.newLoan = new AddLoan();
        from.resetForm();
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  loadMember():void {
    this.memberService.getAllMembers().subscribe((data)=>{
      this.memberList.set(data);
    })
  }
  //load data to bookList
  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((data)=>{
      this.bookList.set(data);
      this.filterBookList.set(data);
    })
  }

  //load category to categoryList
  loadCategories():void{
    this.CategoryService.getAllCategories().subscribe((data)=>{
      this.categoryList.set(data);
      console.log(this.filterBookList());
    })
  }

  //filter book based on category
  handleFilterBooks(categoryId: string):void {
    if(!categoryId){
      this.filterBookList.set(this.bookList());
    }else{
      this.filterBookList.set(this.bookList().filter(book => book.categoryId === categoryId));
    }
  }

  cancelAddBook(){
    this.editBook = false
    this.editBookId = ''
    this.newBook = new Book();

  }

  //addBook 
  addBook(form : NgForm): void {

   // console.log('addBook')

    if(this.editBook){
        this.saveUpdate();
        return;
    }

   // console.log('2addBook')

    this.bookService.addBook(this.newBook).subscribe({
      next:()=>{
      this.loadBooks();
      this.newBook = new Book();
      form.resetForm()
    },
    error:(error)=>{
      console.log(error);
    }
  })
  }

  updateBook(id : string){
    const getBook = this.bookList().find(book => book.id === id);

    if(!getBook){
      alert("Book not found");
      return
    }

    // console.log(id)
    // console.log(getBook.id);

    this.newBook = { ...getBook };
    this.editBook = true;
    this.editBookId = getBook.id
  }

  saveUpdate():void{

    console.log('saveUpdate')
    if(!this.editBookId) return;

    console.log('2saveUpdate')
    const updateBook = {...this.newBook, bookId: this.editBookId}

    this.bookService.updateBook(updateBook).subscribe({
      next: () =>{
        this.loadBooks();
        this.newBook = new Book();
        this.editBook = false;
        this.editBookId = null;
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  getCategoryName(arg0: string): string {
    return this.categoryList().find(category => category.categoryId === arg0)?.categoryName || '';
  }

}
