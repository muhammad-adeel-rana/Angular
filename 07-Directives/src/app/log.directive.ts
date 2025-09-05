import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onClick()',
  },
})
export class LogDirective {
  constructor() {}
  private elementRef = inject(ElementRef);

  onClick() {
    console.log("Clicked!");
    console.log(this.elementRef.nativeElement);
  }
}
