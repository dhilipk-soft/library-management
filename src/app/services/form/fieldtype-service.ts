import { Injectable } from '@angular/core';
import { IFieldTypeDefinition } from '../../shared/models/interface/form';
import { TextFieldComponent } from '../../pages/form-create/field-types/text-field/text-field';
import { CheckboxField } from '../../pages/form-create/field-types/checkbox-field/checkbox-field';
import { NumberField } from '../../pages/form-create/field-types/number-field/number-field';

const TEXT_FIELD_DEFINITION = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: TextFieldComponent,
};
const NUMBER_FIELD_DEFINITION = {
  type: 'number',
  label: 'Number Field',
  icon: 'pin',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: NumberField,
};
const CHECKBOX_FIELD_DEFINITION = {
  type: 'checkbox',
  label: 'Checkbox Field',
  icon: 'check_box',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: CheckboxField,
};

@Injectable({
  providedIn: 'root',
})
export class FieldtypeService {
  fieldType = new Map<string, IFieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['number', NUMBER_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldTypeDefinition | undefined {
    return this.fieldType.get(type);
  }

  getAllFieldTypes(): IFieldTypeDefinition[] {
    return Array.from(this.fieldType.values());
  }

}
