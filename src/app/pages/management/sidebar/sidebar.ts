import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Books } from '../books/books';
import { Categories } from '../categories/categories';
import { Loans } from '../loans/loans';
import { Members } from '../members/members';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None
})
export class Sidebar {

  @Input() toogleBar: boolean = false;
  
}
