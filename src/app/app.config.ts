import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { provideRouter, withHashLocation } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { DomSanitizer } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZonelessChangeDetection(),
    MatIconRegistry,
    {
      provide: 'APP_INITIALIZER',
      multi: true,
      deps: [MatIconRegistry, DomSanitizer],
      useFactory: (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => {
        return () => {
          matIconRegistry.addSvgIcon(
            'google',
            domSanitizer.bypassSecurityTrustResourceUrl('assets/images/google-logo.svg')
          );
        };
      }
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor])),
  ],
};
