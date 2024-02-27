import { createSelector } from "@ngrx/store";

export const selectCounter = (state: {counter: number}) => state.counter;

export const selectDoubleCounter = createSelector(
  selectCounter,
  (state: number) => state * 2
);