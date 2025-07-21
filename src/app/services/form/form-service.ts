import { Injectable, signal } from '@angular/core';
import { FormField, FormRow } from '../../shared/models/interface/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

   private row = signal<FormRow[]>([]);
   public readonly rows = this.row.asReadonly();

   constructor(){
    this.row.set([
      {
      id: crypto.randomUUID(),
      fields: []
      }
    ])}

    addField(field: FormField, rowId: string, index?:string){
        
    }

}
