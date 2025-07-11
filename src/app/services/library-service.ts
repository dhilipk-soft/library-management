import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILibrary, ILibraryDetail, ILibraryShow } from '../models/interface/ILibrary';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getAllLibraries(): Observable<ILibraryShow []> {
    return this.http.get<ILibraryShow []>(environment.API_URL+'Library')
  }

  getLibraryById(id: string): Observable<ILibraryShow> {
    return this.http.get<ILibraryShow>(environment.API_URL+'Library/'+`${id}`)
  }

  createLibrary(library: ILibrary): Observable<ILibrary> {
    return this.http.post<ILibrary>(environment.API_URL+'Library', library)
  }

  getAllLibrariesName():Observable<ILibraryDetail[]> {
    return this.http.get<ILibraryDetail[]>("https://localhost:7133/GetAllLibrariesName") ;
  }
}
