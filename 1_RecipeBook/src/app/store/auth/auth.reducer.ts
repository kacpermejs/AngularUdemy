import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user?: User;
  authError?: string;
  loading: boolean;
}

export const initialState: State = {
  user: undefined,
  authError: undefined,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, (state) => {
    return {
      ...state,
      authError: undefined,
      loading: true
    }
  }),
  on(AuthActions.signUpStart, (state) => {
    return {
      ...state,
      authError: undefined,
      loading: true
    }
  }),
  on(AuthActions.authenticationSuccess, (state, action) => {

    const newUser = new User(action.email, action.id, action._token, action._tokenExpirationDate);

    return {
      ...state,
      user: newUser,
      loading: false
    };
  }),
  on(AuthActions.authenticationFail, (state, action) => {
    return {
      ...state,
      user: undefined,
      authError: action.errorMessage,
      loading: false
    }
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: undefined
    };
  }),
  on(AuthActions.clearError, (state) => {
    return {
      ...state,
      authError: undefined
    };
  })
);
