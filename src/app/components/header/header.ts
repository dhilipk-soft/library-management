import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() toggleBar: boolean = false;

  @Output() toggleBarChange = new EventEmitter<boolean>();

  handleToggle(){
    this.toggleBar = !this.toggleBar;
    this.toggleBarChange.emit(this.toggleBar);
  }
}