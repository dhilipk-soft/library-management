import { Type } from "@angular/core";

export interface IFieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  component: Type<unknown>;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: string;
  defaultConfig: any;
  inputType?: string;
}

export interface FormRow {
  id: string;
  fields: FormField[];
}
