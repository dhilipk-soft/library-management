import { Component, computed, Input } from '@angular/core';
import { FormField } from '../../../../shared/models/interface/form';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../../services/form/form-service';
import { FieldPreview } from "../field-preview/field-preview";

@Component({
  selector: 'app-form-field',
  imports: [CommonModule, MatIconModule, FieldPreview],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormFieldComponent {
  @Input() field!: FormField;

  constructor(
    private formService: FormService
  ) {}

  deleteField(event: Event) {
    event.stopPropagation();
    this.formService.deleteField(this.field.id);
  }
}
