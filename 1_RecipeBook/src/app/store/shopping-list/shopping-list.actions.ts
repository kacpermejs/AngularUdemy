import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";

export const addIngredient = createAction(
  '[Shopping list] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  '[Shopping list] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  '[Shopping list] Update Ingredient',
  props<{ id: number, newIngredient: Ingredient}>()
);

export const deleteIngredient = createAction(
  '[Shopping list] Delete Ingredient',
  props< { id: number }>()
);
