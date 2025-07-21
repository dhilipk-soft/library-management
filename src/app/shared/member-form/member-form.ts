import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../../shared/models/class/members';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './member-form.html',
  styleUrl: './member-form.scss'
})
export class MemberForm {


  @Output() newMemberChange = new EventEmitter<Member>();
  @Input() newMember : Member = new Member();
  @Input() editMode: boolean = false;
  @Output() addMemberEvent = new EventEmitter();

  cancelEdit() {
  this.editMode = false;
  this.newMember = new Member();
  }

  addMember(form: NgForm) {
    this.newMemberChange.emit(this.newMember);
    this.addMemberEvent.emit();
    form.resetForm();
  }

}
