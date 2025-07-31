import { Type } from '@angular/core';

export interface IFieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  settingConfig: FieldSettingsDefinition[];
  component: Type<unknown>;
}

export interface FieldSettingsDefinition {
  type: 'text' | 'checkbox' | 'select' | 'dynamic-options';
  key: string;
  label: string;
  options?: OptionItem[];
}

export interface OptionItem {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: string;
  defaultConfig: any;
  inputType?: string;
  placeholder?: string;
  options?: OptionItem[];
}

export interface FormRow {
  id: string;
  fields: FormField[];
}
