import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { shoppingListReducer } from './store/shopping-list/shopping-list.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    },
    provideStore({
      shoppingList: shoppingListReducer
    }),
    provideEffects([
      
    ])
]
};
