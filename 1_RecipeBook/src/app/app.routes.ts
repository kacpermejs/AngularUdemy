import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { recipeResolver } from './services/recipe/recipe.resolver.service';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'recipes', 
    component: RecipesComponent,
    children: [
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: recipeResolver } }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
];