import { Injectable } from '@angular/core';
import { IFieldTypeDefinition } from '../../shared/models/interface/form';
import { TextFieldComponent } from '../../pages/form-create/field-types/text-field/text-field';
import { CheckboxField } from '../../pages/form-create/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../../pages/form-create/field-types/select-field/select-field';

const TEXT_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'required',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'placeholder',
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Number', value: 'number' },
        { label: 'Password', value: 'password' },
      ],
    },
  ],
  component: TextFieldComponent,
};
const CHECKBOX_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox Field',
  icon: 'check_box',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingConfig: [
    { type: 'text', key: 'label', label: 'label' },
    { type: 'checkbox', key: 'required', label: 'required' },
  ],
  component: CheckboxField,
};

const SELECT_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'select',
  label: 'Select Field',
  icon: 'check_box',
  defaultConfig: {
    label: 'Select',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  settingConfig: [
    { type: 'text', key: 'label', label: 'label' },
    { type: 'checkbox', key: 'required', label: 'required' },
    { type: 'dynamic-options', key: 'options', label: 'Dropdown Options' },
  ],
  component: SelectField,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypeService {
  fieldType = new Map<string, IFieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldTypeDefinition | undefined {
    return this.fieldType.get(type);
  }

  getAllFieldTypes(): IFieldTypeDefinition[] {
    return Array.from(this.fieldType.values());
  }
}
