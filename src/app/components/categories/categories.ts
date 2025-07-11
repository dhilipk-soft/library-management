import { Component, inject, OnInit, signal , Output, EventEmitter  } from '@angular/core';
import { CategoryService } from '../../services/categorie-service';
import { Category } from '../../models/class/categories';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../../services/library-service';
import { ILibraryDetail } from '../../models/interface/ILibrary';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {

  categoryList = signal<Category []>([]);
  libraryList = signal<ILibraryDetail []> ([]);
  selectedCategoryId: string = '';
  categoryService = inject(CategoryService);

  constructor(private libraryService: LibraryService) {}  

  ngOnInit(): void {
      this.loadCategories();
      this.loadLibraryies();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((data)=>{
      this.categoryList.set(data);
    })
  }

  loadLibraryies() {
    this.libraryService.getAllLibrariesName().subscribe((data)=>{
      this.libraryList.set(data);
    })
  }

  @Output() categorySelected= new EventEmitter<string>();
  @Output() librarySelected= new EventEmitter<string>();

  onCategoryChange(event :Event): void{
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value;
    this.categorySelected.emit(this.selectedCategoryId);
    //  console.log(this.selectedCategoryId);
  }

  onLibraryChange(event :Event): void{
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value;
    this.librarySelected.emit(this.selectedCategoryId);
    //  console.log(this.selectedCategoryId);
  }
  
}
