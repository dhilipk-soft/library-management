import { Component } from '@angular/core';

@Component({
  selector: 'form-canvas',
  templateUrl: './form-canvas.html',
  standalone: false,
})
export class FormCanvas {
   activeTab: 'editor' | 'preview' = 'editor';
}
