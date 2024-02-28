import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[];
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Tomato', 2), new Ingredient('Potato', 8)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient]
    };
  }),
  on(ShoppingListActions.addIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients]
    };
  }),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    const ingredient = state.ingredients[action.id];
    const updateIngredient = {
      ...ingredient,
      ...action.newIngredient
    }

    const updateIngredients = [...state.ingredients];
    updateIngredients[action.id] = updateIngredient;

    return {
      ...state,
      ingredients: updateIngredients
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter( (ing, id) => id != action.id)
    };
  }),
);