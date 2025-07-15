import { Injectable } from '@angular/core';
import { IFieldTypeDefinition } from '../../models/interface/form';

const TEXT_FIELD_DEFINITION = {
  type: "type",
  label: "Text Field",
  icon: "text_fields"
}
const NUMBER_FIELD_DEFINITION = {
  type: "number",
  label: "Number Field",
  icon: "pin"
}
const  CHECKBOX_FIELD_DEFINITION = {
  type: "checkbox",
  label: "Checkbox Field",
  icon: "check_box"
}

@Injectable({
  providedIn: 'root'
})
export class FieldtypeService {
   fieldType = new Map<string, IFieldTypeDefinition>([
      ["text", TEXT_FIELD_DEFINITION],
      ["checkbox", CHECKBOX_FIELD_DEFINITION],
      ["number",NUMBER_FIELD_DEFINITION]
    ])
  
  
    getAllFieldTypes(): IFieldTypeDefinition[] {
      return Array.from(this.fieldType.values());
    }
    
}
