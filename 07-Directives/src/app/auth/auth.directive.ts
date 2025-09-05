import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from './auth.service';
import { Permission } from './auth.model';
import { LogDirective } from '../log.directive';

@Directive({
  selector: '[appAuth]',
  standalone: true,
  hostDirectives:[LogDirective]
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  authService = inject(AuthService);

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
