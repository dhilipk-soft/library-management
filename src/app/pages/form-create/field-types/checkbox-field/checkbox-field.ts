import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormField } from '../../../../shared/models/interface/form';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckboxModule],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss',
})
export class CheckboxField {
  @Input() field!: FormField;
  ngOnInit() {
    console.log('checkbox====>', this.field);
  }
}
