import { Component, computed, effect, signal } from '@angular/core';
import { FormService } from '../../../services/form/form-service';
import { FormField } from '../../../shared/models/interface/form';
import { FieldTypeService } from '../../../services/form/fieldtype-service';

@Component({
  selector: 'form-setting',
  standalone: false,
  templateUrl: './form-setting.html',
  styleUrl: './form-setting.scss',
})
export class FormSetting {
  selectedField = signal<any>(null);

  fieldSetting = computed(() => {
    const field = this.selectedField();
    if (!field) return [];
    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.settingConfig || [];
  });

  constructor(
    private formService: FormService,
    private fieldTypesService: FieldTypeService
  ) {
    effect(() => {
      const value = this.formService.selectedField$();
      this.selectedField.set(value ? { ...value } : null);
    });
  }

  updateField(selectFieldId: string = '', key: string, value: any) {
    // debugger;
    this.formService.updateField(selectFieldId, { [key]: value });
  }
}
