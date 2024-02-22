import { Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { 
    path: 'recipes',
    loadChildren: () => import('./recipes/recipe.routes').then(r => r.routes)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.routes').then(r => r.routes)
  },
  { path: 'login', component: AuthComponent },
  { path: '**', redirectTo: 'recipes' }
];