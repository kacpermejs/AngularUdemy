import { createAction, props } from "@ngrx/store";

import { Recipe } from "../../models/recipe.model";

export const setRecipe = createAction(
  '[Recipes] Set recipes',
  props<{recipes: Recipe[]}>()
);

export const fetchRecipes = createAction(
  '[Recipes] Fetch recipes'
);

export const addRecipe = createAction(
  '[Recipes] Add recipe',
  props<{recipe: Recipe}>()
);

export const updateRecipe = createAction(
  '[Recipes] Update recipe',
  props<{id: number, recipe: Recipe}>()
);

export const deleteRecipe = createAction(
  '[Recipes] Delete recipe',
  props<{id: number}>()
);

export const storeRecipes = createAction(
  '[Recipes] Store recipe'
);

