import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const login = createAction(
  "[Auth] login",
  props<{email: string, id: string, _token: string, _tokenExpirationDate: Date}>()
);

export const logout = createAction(
  "[Auth] logout",
);