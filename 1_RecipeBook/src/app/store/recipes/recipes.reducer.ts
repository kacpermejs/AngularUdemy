import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../../models/recipe.model";
import * as RecipeActions from "./recipes.actions";

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: []
}

export const recipeReducer = createReducer(
  initialState,
  on(RecipeActions.setRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...action.recipes]
    }
  }),
  on(RecipeActions.addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.recipe]
    }
  }),
  on(RecipeActions.updateRecipe, (state, action) => {
    const updatedRecipe = {
      ...state.recipes[action.id],
      ...action.recipe
    };

    const newRecipes = [...state.recipes];
    newRecipes[action.id] = updatedRecipe;

    return {
      ...state,
      recipes: newRecipes
    }
  }),
  on(RecipeActions.deleteRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter( (recipe, index) => index !== action.id)
    }
  }),
);