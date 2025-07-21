import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Book } from '../models/class/books';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICategory } from '../models/interface/ICategories';
import { ILibraryDetail } from '../models/interface/ILibrary';
import { MatIconModule } from "@angular/material/icon";
import { AppOnlyNumbers } from '../directives/onlynumberdirective';

@Component({
  selector: 'app-book-form',
  imports: [MatInputModule, ReactiveFormsModule, MatSelectModule, CommonModule, MatIconModule,AppOnlyNumbers],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BookForm {

  bookForm!: FormGroup;

  @Input() bookData!: Book; 
  @Input() editBook!: boolean;
  @Input() libraryList!: ILibraryDetail[];
  @Input() categoryList!: ICategory[];

  @Output() bookDataChange = new EventEmitter<Book>();


  constructor(
    private fb:FormBuilder
  ){ }

  ngOnInit(): void{
    this.formGenerate()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookData'] && !changes['bookData'].firstChange) {
      this.patchValue(); 
    }
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

  patchValue(): void{
    if(this.bookData)
    this.bookForm.patchValue({
      title: this.bookData.title || '',
      author: this.bookData.author || '',
      totalCopies: this.bookData.totalCopies ?? 0  ,
      categoryId: this.bookData.categoryId || '',
      libraryId: this.bookData.libraryId || '',
    })
  }

  addBook(){
    // debugger
    this.bookDataChange.emit(this.bookForm.value);
    setTimeout(() => this.resetForm());
  }

  resetForm(): void {
  this.bookForm.reset();
  this.bookForm.patchValue({
    title: '',
    author: '',
    totalCopies: 0,
    categoryId: '',
    libraryId: '',
  });
  this.bookForm.markAsPristine();
  this.bookForm.markAsUntouched();
  this.bookForm.updateValueAndValidity();
}

  

}
