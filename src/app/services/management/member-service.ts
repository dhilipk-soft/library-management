import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateMember, IMember } from '../../shared/models/interface/IMembers';
import { environment } from '../../../environments/environment.development';

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

  createMember(member:  ICreateMember):Observable<ICreateMember> {
    return this.http.post<ICreateMember>(environment.API_URL + 'Member', member)
  }

  updateMemberById(id: string, member: IMember): Observable<IMember> {
    return this.http.put<IMember>(environment.API_URL + 'Member/' + `${id}`, member);
  }


  deleteMemberById(id: string): Observable<IMember> {
    return this.http.delete<IMember>(environment.API_URL + 'Member/' + `${id}`);
  }

}
