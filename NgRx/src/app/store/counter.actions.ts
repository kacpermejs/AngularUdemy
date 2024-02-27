import { Action, createAction, props } from "@ngrx/store";

export const increment = createAction(
  '[Counter] Increment',
  props<{value: number}>()
);

export const DECREMENT = '[Counter] Decrement';

export const decrement = createAction(
  DECREMENT,
  props<{value: number}>()
);