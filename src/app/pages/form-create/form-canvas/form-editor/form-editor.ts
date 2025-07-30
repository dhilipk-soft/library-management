import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, signal } from '@angular/core';
import { FormService } from '../../../../services/form/form-service';
import {
  FormField,
  FormRow,
  IFieldTypeDefinition,
} from '../../../../shared/models/interface/form';
import { FormFieldComponent } from '../form-field/form-field';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
  standalone: true,
})
export class FormEditor {
  formRows = signal<FormRow[]>([]);

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formService.rows$.subscribe((row) => {
      this.formRows.set(row);
    });
  }

  addDropList(event: CdkDragDrop<string>) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as IFieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        ...fieldType.defaultConfig,
        type: fieldType.type,
        label: fieldType.label,
      };

      this.formService.addRow(newField);
      return;
    }
  }

  onDropList(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as IFieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        ...fieldType.defaultConfig,
        type: fieldType.type,
        label: fieldType.label,
      };

      this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }
  }
}
