import {inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, take } from 'rxjs';

export const recipeResolver: ResolveFn<Recipe> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // return inject(RecipeService).getRecipe(+route.paramMap.get('id')!);
  const store: Store<fromApp.AppState> = inject(Store)
  const id = +route.paramMap.get('id')!;
  const result =  store.select('recipes').pipe(
    take(1),
    map((recipeState => {
      return recipeState.recipes.find((recipe, index) => {
        return index == id;
      })
    }))
  );
  
  return result;
};