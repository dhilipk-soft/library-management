import { Component, Input } from '@angular/core';
import { Books } from '../../pages/books/books';
import { Categories } from '../categories/categories';
import { Loans } from '../../pages/loans/loans';
import { Members } from '../../pages/members/members';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  @Input() toogleBar: boolean = false;
  
}
