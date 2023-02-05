import { createReducer } from '@reduxjs/toolkit';
import { resetCurrentIngredient, setCurrentIngredient } from '../actions/current-ingredient';
import type { TIngredient } from '../types/types';

type TCurrentIngredientState = {
  currentIngredient: Partial<TIngredient>;
}

const initialState: TCurrentIngredientState = {
  currentIngredient: {}
}

export const currentIngredientReducer = createReducer(initialState, builder => {
  builder
    .addCase(setCurrentIngredient, (state, action) => {
      state.currentIngredient = action.payload;
    })
    .addCase(resetCurrentIngredient, (state) => {
      state.currentIngredient = {};
    })
})
