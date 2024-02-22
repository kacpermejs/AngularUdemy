import {inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../services/data-storage/data-storage.service';
import { RecipeService } from '../services/recipe/recipe.service';

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const service = inject(RecipeService);
  const recipes = service.getRecipes();

  if (recipes.length === 0)
    return inject(DataStorageService).fetchRecipes();
  else
    return recipes;

};