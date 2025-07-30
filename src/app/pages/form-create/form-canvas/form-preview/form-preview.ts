import { Component, signal } from '@angular/core';
import { FormService } from '../../../../services/form/form-service';
import { FormRow } from '../../../../shared/models/interface/form';
import { FieldPreview } from "../field-preview/field-preview";

@Component({
  selector: 'app-form-preview',
  imports: [FieldPreview],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss'
})
export class FormPreview {

  formRows = signal<FormRow[]>([]);

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formService.rows$.subscribe((row) => {
      this.formRows.set(row);
    });
  }
  }

