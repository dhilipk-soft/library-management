import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '../models/class/categories';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories():Observable<Category[]> {
    // return this.
    return this.http.get<Category[]>(environment.API_URL+'Category');
  }

  getCategoryById(id: string) : Observable<Category> {
    return this.http.get<Category>(environment.API_URL+'Category/'+`${id}`);
  }

  updateCategoryById(category: Category) : Observable<Category> {
    return this.http.put<Category>(environment.API_URL+'Category/'+`${category.categoryId}`,category)
  }
}
