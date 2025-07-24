import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Book } from '../../shared/models/class/books';
import { UpdateBook } from '../../shared/models/interface/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    
    return this.http.get<Book[]>(environment.API_URL + 'Book');
  }

  getBookById(id: string): Observable<Book> {
    
    return this.http.get<Book>(environment.API_URL + 'Book/' + `${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(environment.API_URL + 'Book', book);
  }

  updateBook(book: UpdateBook, id: string): Observable<UpdateBook> {
    return this.http.put<UpdateBook>(environment.API_URL + 'Book/' + `${id}`, book);
  }
}
