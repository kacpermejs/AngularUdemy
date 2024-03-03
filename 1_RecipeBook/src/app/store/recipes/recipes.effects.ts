import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import * as fromApp from "../app.reducer";
import * as RecipesActions from "./recipes.actions";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../../models/recipe.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}

  private recipesEndpoint = environment.apiUrl + 'recipes.json';

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.recipesEndpoint).pipe(
          map((recipes) => {
            if (recipes != null) {
              return recipes.map((recipe) => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
              });
            }
            return [];
          }),
          map(recipes => RecipesActions.setRecipe({recipes: recipes}))
        );
      })
    )
  );

  storeRecipes = createEffect(() => 
    this.actions$.pipe(
      ofType(RecipesActions.storeRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap( ([actionData, recipesState]) => {
        return this.http.put(this.recipesEndpoint, recipesState.recipes)
      })
    ),
    {dispatch: false}
  );
}