import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
  standalone: true
})
export class FormEditor {

  constructor(){
    console.log("FormEditor");
  }

  onDropList(event : CdkDragDrop<string>) {
    console.log(event)
  }

}
