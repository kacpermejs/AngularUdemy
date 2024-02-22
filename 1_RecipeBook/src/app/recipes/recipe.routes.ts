import { Routes } from "@angular/router";
import { recipeResolver } from "../resolvers/recipe.resolver";
import { recipesResolver } from "../resolvers/recipes.resolver";
import { AuthGuard } from "../services/auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";

export const routes: Routes = [
  {
    path: '', 
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: {recipes: recipesResolver},
    children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: recipeResolver } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: recipeResolver } },
    ]
  },
];