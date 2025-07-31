import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionItem } from '../../../../shared/models/interface/form';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-dynamic-option',
  imports: [FormsModule, MatIconModule, MatInputModule],
  templateUrl: './dynamic-option.html',
  styleUrl: './dynamic-option.scss',
})
export class DynamicOption {
  @Input() title: string = '';
  @Input() options!: OptionItem[];

  @Output() optionsChange = new EventEmitter<OptionItem[]>();

  addOption() {
    const currentOption = this.options;
    const newOption = [...currentOption];
    this.options = newOption;
    this.options.push({ label: '', value: '' });
    this.optionsChange.emit(this.options);
  }

  updateOption(index: number, newLabel: string) {
    const currentOption = this.options;
    const newOption = [...currentOption];
    newOption[index] = {
      ...newOption[index],
      label: newLabel,
    };
    this.options = newOption;
    this.optionsChange.emit(this.options);
  }

  removeOption(index: number) {
    const currentOption = this.options;
    const newOption = currentOption.splice(index, 1);
    this.options = newOption;
    this.optionsChange.emit(this.options);
  }
}
