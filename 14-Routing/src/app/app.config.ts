import { ApplicationConfig } from '@angular/core';
import { routes } from './app.route';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
