import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { recipeResolver } from './resolvers/recipe.resolver';
import { recipesResolver } from './resolvers/recipes.resolver';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'recipes', 
    component: RecipesComponent,
    resolve: {recipes: recipesResolver},
    children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: recipeResolver } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: recipeResolver } },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
];