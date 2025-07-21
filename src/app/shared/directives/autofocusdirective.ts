import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutofocusDirective {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
