import {inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from './recipe.service';

export const recipeResolver: ResolveFn<Recipe> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(RecipeService).getRecipe(+route.paramMap.get('id')!);
};