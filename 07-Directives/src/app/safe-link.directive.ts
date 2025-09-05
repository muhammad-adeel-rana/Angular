import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  constructor() {}

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  onConfirmLeavePage(event: MouseEvent) {
    const leavePage = window.confirm('Do you want to leave the page.');

    if (leavePage) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
