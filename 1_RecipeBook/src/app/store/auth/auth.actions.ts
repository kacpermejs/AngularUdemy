import { createAction, props } from "@ngrx/store";

export const authenticationSuccess = createAction(
  "[Auth] Auth success",
  props<{email: string, id: string, _token: string, _tokenExpirationDate: Date, redirect: boolean}>()
);

export const logout = createAction(
  "[Auth] Logout",
);

export const loginStart = createAction(
  "[Auth] Login start",
  props<{email: string, password: string}>()
);

export const authenticationFail = createAction(
  "[Auth] Auth fail",
  props<{errorMessage: string}>()
);

export const signUpStart = createAction(
  '[Auth] Sign up start',
  props<{email: string, password: string}>()
);

export const clearError = createAction(
  '[Auth] Clear error'
);

export const autoLogin = createAction(
  '[Auth] Auto login'
);
