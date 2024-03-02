import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "./auth/auth.reducer";
import * as fromShoppingList from "./shopping-list/shopping-list.reducer";

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}
