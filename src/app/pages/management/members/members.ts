import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../services/management//member-service';
import { IMember } from '../../../models/interface/IMembers';
import {FormsModule, NgForm}  from '@angular/forms';
import { Member } from '../../../models/class/members';
import { CommonModule } from '@angular/common';
import { MemberForm } from "../../../components/member-form/member-form";

@Component({
  selector: 'app-members',
  imports: [FormsModule, CommonModule, MemberForm],
  templateUrl: './members.html',
  styleUrl: './members.css'
})
export class Members implements OnInit{

  editMode = false;
  editId: string | null = null;
  newMember = new Member();
  memberList = signal<IMember []>([]);
  memberService = inject(MemberService);

  ngOnInit(): void{
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe((data)=>{
      this.memberList.set(data);
    })
  }

  addMember() {
     if (this.editMode) {
      this.saveUpdate();
      return;
    }
    
    this.memberService.createMember(this.newMember).subscribe({
      next: ()=>{
      this.loadMembers();
      this.newMember = new Member();
      },error: (error)=>{
        console.log(error);
      }
    })
  }

  deleteMember(id: string) {
    this.memberService.deleteMemberById(id).subscribe((data)=>{
      this.loadMembers();
    })
  }

  updateMember(id: string){

    const getMember = this.memberList().find(member => member.memberId === id);

    if( !getMember){
      alert("Member not found");
      return;
    }
      this.newMember = { ...getMember,password: '' };
      this.editMode = true;
      this.editId = id;
  }

  saveUpdate() {
  if (!this.editId) return;

  const updatedMember = { ...this.newMember, memberId: this.editId };

  this.memberService.updateMemberById(this.editId, updatedMember).subscribe({
    next: () => {
      this.loadMembers();
      this.newMember = new Member();
      this.editMode = false;
      this.editId = null;
    },
    error: (err) => {
      console.error("Update failed", err);
    }
  });
}


}
