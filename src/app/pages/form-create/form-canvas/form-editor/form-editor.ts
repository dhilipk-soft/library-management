import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, signal } from '@angular/core';
import { FormService } from '../../../../services/form/form-service';
import {
  FormField,
  FormRow,
  IFieldTypeDefinition,
} from '../../../../shared/models/interface/form';
import { FormFieldComponent } from '../form-field/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent, MatIconModule],
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

  deleteList(rowId: string) {
    this.formService.deleteRow(rowId);
  }

  onDropList(event: CdkDragDrop<string>, rowId: string = '') {
    console.log(event);
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as IFieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        ...fieldType.defaultConfig,
        type: fieldType.type,
        label: fieldType.label,
      };
      if (rowId === '') this.formService.addRow(newField);
      else this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }

    const dragData = event.item.data as FormField;
    const previousRowId = event.previousContainer.data as string;

    this.formService.moveField(
      dragData.id,
      previousRowId,
      rowId,
      event.currentIndex
    );
  }
}
