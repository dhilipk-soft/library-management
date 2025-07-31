import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormField } from '../../../../shared/models/interface/form';

@Component({
  selector: 'app-select-field',
  imports: [MatInputModule, MatSelectModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
})
export class SelectField {
  @Input() field!: FormField;
}
