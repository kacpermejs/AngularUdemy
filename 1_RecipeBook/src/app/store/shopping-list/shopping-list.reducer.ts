import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null,
  editedIngredientIndex: number,
}

export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [new Ingredient('Tomato', 2), new Ingredient('Potato', 8)],
  editedIngredient: null,
  editedIngredientIndex: -1
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
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updateIngredient = {
      ...ingredient,
      ...action.ingredient
    }

    const updateIngredients = [...state.ingredients];
    updateIngredients[state.editedIngredientIndex] = updateIngredient;

    return {
      ...state,
      ingredients: updateIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter( (ing, id) => id != state.editedIngredientIndex)
    };
  }),
  on(ShoppingListActions.startEdit, (state, action) => {
    console.log(action);
    console.log(state);
    return {
      ...state,
      editedIngredientIndex: action.id,
      editedIngredient: { ...state.ingredients[action.id] }
    }
  }),
  on(ShoppingListActions.stopEdit, (state, action) => {
    console.log(action);
    console.log(state);
    return {
      ...state,
      editedIngredientIndex: -1,
      editedIngredient: null
    }
  })
);