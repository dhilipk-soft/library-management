import { computed, Injectable, signal } from '@angular/core';
import { FormField, FormRow } from '../../shared/models/interface/form';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = new BehaviorSubject<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);

  public readonly rows$ = this._rows.asObservable();
  public readonly selectedField$ = computed(() => {
    const selectedId = this._selectedFieldId();
    return this.rows
      .flatMap((row) => row.fields)
      .find((field) => field.id === selectedId);
  });

  private get rows(): FormRow[] {
    return this._rows.getValue();
  }

  private setRows(rows: FormRow[]): void {
    this._rows.next(rows);
  }

  setSelectedField(id: string) {
    this._selectedFieldId.set(id);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number
  ) {
    const rows = this.rows;

    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex((f) => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;

    const newRows = [...rows];
    const fieldsWithRemovedField = newRows[sourceRowIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemovedField;

    const targetRowIndex = rows.findIndex((row) => row.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = rows[targetRowIndex].fields;
      targetFields.splice(targetIndex, 0, fieldToMove);
      rows[targetRowIndex].fields = targetFields;
    }
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
