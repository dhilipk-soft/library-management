import { Component, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-import-book',
  imports: [MatInputModule],
  templateUrl: './import-book.html',
  styleUrl: './import-book.scss',
  encapsulation: ViewEncapsulation.None
})
export class _ImportBook {

}
