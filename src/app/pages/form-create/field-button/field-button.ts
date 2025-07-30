import { Component, Input, signal } from '@angular/core';
import { IFieldTypeDefinition } from '../../../shared/models/interface/form';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  templateUrl: './field-button.html',
  styleUrl: './field-button.scss',
  standalone: false,
})
export class FieldButton {
  @Input() type!: IFieldTypeDefinition;

  whileDragging = signal(false);
}
