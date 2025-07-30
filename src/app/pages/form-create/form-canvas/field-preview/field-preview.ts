import { Component, computed, Input, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormField } from '../../../../shared/models/interface/form';
import { FieldtypeService } from '../../../../services/form/fieldtype-service';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss',
})
export class FieldPreview {
  @Input() field!: FormField;
  constructor(private fieldTypeService: FieldtypeService) {}

  previewComponent = computed(() => {
    return (
      this.fieldTypeService.getFieldType(this.field.type)?.component ?? null
    );
  });
}
