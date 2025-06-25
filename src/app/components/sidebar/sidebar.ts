import { Component } from '@angular/core';
import { Books } from '../../pages/books/books';
import { Categories } from '../categories/categories';
import { Loans } from '../../pages/loans/loans';
import { Members } from '../../pages/members/members';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [Books, Categories, Loans, Members, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
