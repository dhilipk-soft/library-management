import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMember } from '../models/interface/IMembers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAllMembers():Observable<IMember []> {
    return this.http.get<IMember []>(environment.API_URL + 'Member')
  }

  getMemberById(id: string):Observable<IMember> {
    return this.http.get<IMember>(environment.API_URL + 'Member/' + `${id}`)
  }

  createMember(member: IMember):Observable<IMember> {
    return this.http.post<IMember>(environment.API_URL + 'Member', member)
  }

  updateMemberById(id: string, member: IMember): Observable<IMember> {
    return this.http.put<IMember>(environment.API_URL + 'Member/' + `${id}`, member);
  }


  deleteMemberById(id: string): Observable<IMember> {
    return this.http.delete<IMember>(environment.API_URL + 'Member/' + `${id}`);
  }

}
