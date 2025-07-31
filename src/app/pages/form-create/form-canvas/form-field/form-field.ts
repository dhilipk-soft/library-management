import { Component, computed, effect, Input, signal } from '@angular/core';
import { FormField } from '../../../../shared/models/interface/form';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../../services/form/form-service';
import { FieldPreview } from '../field-preview/field-preview';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule, MatIconModule, FieldPreview],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormFieldComponent {
  @Input() field!: FormField;
  currentSelectedField = signal<string>('');

  constructor(private formService: FormService) {
    effect(() => {
      const selected = this.formService.selectedField$();
      if (selected?.id) {
        this.currentSelectedField.set(selected.id);
      }
    });
  }

  setSelectedField(id: string) {
    this.formService.setSelectedField(id);
  }

  deleteField(event: Event) {
    event.stopPropagation();
    this.formService.deleteField(this.field.id);
  }
}
