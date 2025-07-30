import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../../shared/models/interface/form';

@Component({
  selector: 'app-text-field',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TextFieldComponent {
  @Input() field!: FormField;
}
