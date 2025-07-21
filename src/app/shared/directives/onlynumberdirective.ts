import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class AppOnlyNumbers {

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent){
    if(!/[0-9]/.test(event.key)){
      event.preventDefault();
    }
  }
}
