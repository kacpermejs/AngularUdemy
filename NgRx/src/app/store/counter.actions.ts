import { createAction, props } from "@ngrx/store";

export const init = createAction(
  '[Counter] Init'
);

export const set = createAction(
  '[Counter] Set',
  props<{value: number}>()
);

export const increment = createAction(
  '[Counter] Increment',
  props<{value: number}>()
);

export const DECREMENT = '[Counter] Decrement';

export const decrement = createAction(
  DECREMENT,
  props<{value: number}>()
);