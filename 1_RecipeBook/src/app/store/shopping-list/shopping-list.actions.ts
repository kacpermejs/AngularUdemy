import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";

export const ADD_INGREDIENT = '[Shopping list] Add Ingredient'
export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ingredient: Ingredient}>()
);