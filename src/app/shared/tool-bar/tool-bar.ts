import {
  Component,
  EventEmitter,
  Input,
  Output,
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

  categoryId: string =''
  libraryId: string =''
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchHandle = new EventEmitter<{categoryId: string, libraryId: string}>();


  handleCategoryChange(event: string) {
    this.categoryId = event
    this.searchHandle.emit({categoryId: this.categoryId, libraryId: this.libraryId})
  }

  handleLibraryChange(event: string) {
    this.libraryId = event
    this.searchHandle.emit({categoryId: this.categoryId, libraryId: this.libraryId})
  }

  onSearchChange(value: string) {
    this.searchText = value;
    this.searchTextChange.emit(value);
  }
}
