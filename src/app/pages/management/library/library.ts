import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../../services/management//member-service';
import { IMember } from '../../../models/interface/IMembers';
import { CommonModule } from '@angular/common';
import {  ILibraryShow } from '../../../models/interface/ILibrary';
import { LibraryService } from '../../../services/management//library-service';
import { Library } from '../../../models/class/Library';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-library',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Libraries implements OnInit{
  
  newMemberid: string | null ='';
  memberList = signal<IMember []>([])
  filterMemberList = signal<IMember []>([])
  selectedList = signal<IMember []>([])
  checkLibraryNameErr: boolean = false;
  libraryList = signal<ILibraryShow []>([])

  newLibrary: Library = new Library();

  memberService = inject(MemberService);
  libraryService = inject(LibraryService)

  ngOnInit(): void {
      this.loadMember()
      this.loadLibrary()
  }

  loadMember():void {
    this.memberService.getAllMembers().subscribe((data)=>{
      this.memberList.set(data);
      this.filterMemberList.set(data);
    })
  }

  loadLibrary(): void{
    this.libraryService.getAllLibraries().subscribe((data)=>{
      this.libraryList.set(data);
    })
  }

  removeMemberLibrary(id: string):void{
    // console.log("remove")
    this.selectedList.set(this.selectedList().filter(l => l.memberId !== id))
    this.handleAddFilterMember(id)
  }

  handleAddFilterMember(id: string):void{
    const filter = this.memberList().find(l => l.memberId === id)
    if(filter){
      this.filterMemberList.set([...this.filterMemberList(), filter])
    }
  }


  handlefilterMember(id: string):void{
    const filter = this.filterMemberList().find(l => l.memberId === id)
    if(filter){
      this.filterMemberList.set(this.filterMemberList().filter(l => l.memberId !== id))
    }
  }

  checkLibraryName(): void {
    // console.log("library")
  if (!this.newLibrary.libraryName) return;

  const exists = this.libraryList().some(
    l => l.libraryName.toLowerCase().trim() === this.newLibrary.libraryName!.toLowerCase().trim()
  );

  this.checkLibraryNameErr = exists;
  }

  disableButton():boolean{
    return !this.newLibrary.libraryName || this.checkLibraryNameErr || this.selectedList().length === 0;
  }

  addMemberLibrary():void {
     if (!this.newMemberid) return;

    const selectedMember  = this.memberList().find(m => m.memberId === this.newMemberid)
    if(selectedMember  && !this.selectedList().some(l => l.memberId === this.newMemberid)){
      this.selectedList.set([...this.selectedList(), selectedMember])
      this.handlefilterMember(selectedMember.memberId)
      this.newMemberid = ''
    }
  }

  addLibrary():void{
    // console.log("addLibrary")
     const memberIds: string[]=this.selectedList().map(l => l.memberId);

     this.newLibrary.membersIds = memberIds;
     this.newLibrary.libraryName = this.newLibrary.libraryName?.trim().toUpperCase();

     this.libraryService.createLibrary(this.newLibrary).subscribe({
      next: () => {
        this.resetLibrary();
        this.loadLibrary();
      },
      error: (err) => {
        console.error(err);
      }
     })
  }

  resetLibrary(): void {
  this.newLibrary.libraryName = ""
  this.newLibrary.membersIds = []; 
  this.selectedList.set([]);
  console.log(this.selectedList());
  this.filterMemberList.set(this.memberList()); // restore full list
  this.newMemberid = ''; // reset selected dropdown
  this.checkLibraryNameErr = false; // reset error state
}


}
