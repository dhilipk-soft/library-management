import {
  Component,
  EventEmitter,
  Input,
  Output,
  OutputEmitterRef,
  SimpleChanges,
} from '@angular/core';
import { Categories } from '../categories/categories';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tool-bar',
  imports: [Categories, MatIconModule, FormsModule],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.scss',
})
export class ToolBar {
  searchText: string = '';
  categoryId: string = '';
  libraryId: string = '';

  @Output() filterChange = new EventEmitter<{
    search: string;
    category: string;
    library: string;
  }>();

  handleCategoryChange(event: string) {
    this.categoryId = event;
    this.filterChange.emit({
      search: this.searchText,
      category: this.categoryId,
      library: this.libraryId,
    });
  }

  handleLibraryChange(event: string) {
    this.libraryId = event;
    this.filterChange.emit({
      search: this.searchText,
      category: this.categoryId,
      library: this.libraryId,
    });
  }

  onSearchChange(value: string) {
    this.searchText = value;
    this.filterChange.emit({
      search: this.searchText,
      category: this.categoryId,
      library: this.libraryId,
    });
  }
}
