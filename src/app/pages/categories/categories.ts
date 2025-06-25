
import { Component, inject, OnInit, signal , Output, EventEmitter  } from '@angular/core';
import { CategoryService } from '../../services/categorie-service';
import {Category} from '../../models/class/categories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {

  categoryList = signal<Category []>([]);
  selectedCategoryId: string = '';
  categoryService = inject(CategoryService);

  ngOnInit(): void {
      this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((data)=>{
      this.categoryList.set(data);
      console.log.apply(this.categoryList());
    })
  }

  @Output() categorySelected= new EventEmitter<string>();

  onCategoryChange(event :Event): void{
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value;
    this.categorySelected.emit(this.selectedCategoryId);
    //  console.log(this.selectedCategoryId);
  }
  
}

