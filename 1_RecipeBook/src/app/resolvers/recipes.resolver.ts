import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../store/recipes/recipes.actions';

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const store: Store<fromApp.AppState> = inject(Store);
  const actions$: Actions = inject(Actions);

  return store.select('recipes').pipe(
    take(1),
    map( recipesState => recipesState.recipes),
    switchMap( recipes => {
      if (recipes.length === 0) {
        store.dispatch(RecipesActions.fetchRecipes());
        return actions$.pipe(
          ofType(RecipesActions.setRecipe),
          take(1),
          map( res => res.recipes)
        )
      } else {
        return of(recipes)
      }
    })
  );

};