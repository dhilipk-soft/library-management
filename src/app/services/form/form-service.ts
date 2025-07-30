import { Injectable, signal } from '@angular/core';
import { FormField, FormRow } from '../../shared/models/interface/form';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = new BehaviorSubject<FormRow[]>([]);
  public readonly rows$ = this._rows.asObservable();

  private get rows(): FormRow[] {
    return this._rows.getValue();
  }

  private setRows(rows: FormRow[]): void {
    this._rows.next(rows);
  }

  deleteRow(rowId: string) {
    const rows = this.rows;
    const newRows = rows.filter((row) => row.id !== rowId);
    this.setRows(newRows);
  }

  addRow(field: FormField) {
    const rows = this.rows;
    const newRows = [...rows, { id: crypto.randomUUID(), fields: [field] }];
    this.setRows(newRows);
  }

  deleteField(id: string) {
    const rows = this.rows;
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((m) => m.id !== id),
    }));
    this.setRows(newRows);
  }

  addField(field: FormField, rowId: string, index?: number) {
    const rows = this.rows;
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updateFields = [...row.fields];
        if (index !== undefined) {
          updateFields.splice(index, 0, field);
        } else {
          updateFields.push(field);
        }
        return { ...row, fields: updateFields };
      }
      return row;
    });
    // console.log(newRows)
    this.setRows(newRows);
  }
}
