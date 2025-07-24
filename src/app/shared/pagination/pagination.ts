import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  imports: [MatIconModule,CommonModule  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() totalPageCount: number = 0;
  @Input() currentPage: number = 1;

  @Output() currentPageChange = new EventEmitter<number>();

  goToFirstPage() {
    this.currentPage = 1;
    this.currentPageChange.emit(this.currentPage);
  }

  goToPreviousPage() {
    if (this.currentPage + 1 <= this.totalPageCount) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage - 1 > 0) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPageCount;
    this.currentPageChange.emit(this.currentPage);
  }
}
