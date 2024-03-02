import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user.model";
import { login, logout } from "./auth.actions";

export interface State {
  user?: User;
}

export const initialState: State = {
  user: undefined
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => {

    const newUser = new User(action.email, action.id, action._token, action._tokenExpirationDate);

    return {
      ...state,
      user: newUser
    };
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      user: undefined
    };
  })
);
