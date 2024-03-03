import { ApplicationConfig, enableProdMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment.development';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { RecipesEffects } from './store/recipes/recipes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    },
    provideStore(fromApp.appReducer),
    provideEffects([
      AuthEffects,
      RecipesEffects
    ]),
    provideStoreDevtools({logOnly: environment.production})
]
};
