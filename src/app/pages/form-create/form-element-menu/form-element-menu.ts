import { Component, Input, signal } from '@angular/core';
import { IFieldTypeDefinition } from '../../../shared/models/interface/form';
import { FieldtypeService } from '../../../services/form/fieldtype-service';
import { CdkDrag } from '@angular/cdk/drag-drop';
@Component({
  selector: 'form-element-menu',
  templateUrl: './form-element-menu.html',
  styleUrl: './form-element-menu.scss',
  standalone: false,
})
export class FormElementMenu {
  fieldType = signal<IFieldTypeDefinition[]>([]);

  constructor(private fieldTypeService: FieldtypeService) {}

  ngOnInit(): void {
    this.loadFieldTypes();
  }

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }

  loadFieldTypes() {
    this.fieldType.set(this.fieldTypeService.getAllFieldTypes());
  }
}
