import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormModuleModule } from './modules/form-module/form-module-module';
import { authInterceptor } from '../core/auth-interceptor';
import { AuthErrorInterceptor } from '../core/auth/auth-error-guard';
import { RoleGuard } from '../core/guard/role-guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    RoleGuard,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { 
          appearance: 'outline',  
          subscriptSizing: 'dynamic'
         }
    },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true
    },
    importProvidersFrom(
      BrowserAnimationsModule,
      FormModuleModule
    ),
    provideToastr()
  ]
};
