import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ILibraryShow, ILibrary, ILibraryDetail } from '../../models/interface/ILibrary';

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
