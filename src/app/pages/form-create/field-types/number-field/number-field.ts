import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../../shared/models/interface/form';

@Component({
  selector: 'app-number-field',
  imports: [MatInputModule],
  templateUrl: './number-field.html',
  styleUrl: './number-field.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NumberField {
  @Input() field!: FormField;
}
