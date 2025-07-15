import { Component, Input,  signal } from '@angular/core';
import { IFieldTypeDefinition } from '../../../models/interface/form';
import { FieldtypeService } from '../../../services/form/fieldtype-service';
@Component({
  selector: 'form-element-menu',
  templateUrl: './form-element-menu.html',
  styleUrl: './form-element-menu.scss',
  standalone: false
})
export class FormElementMenu {

   fieldType = signal<IFieldTypeDefinition []>([]) ;

  constructor(
   private fieldTypeService: FieldtypeService
  ) { }

  ngOnInit(): void {
    this.loadFieldTypes()
  }

  loadFieldTypes() {
    this.fieldType.set(this.fieldTypeService.getAllFieldTypes())
  }


}

