import type { TIngredient } from '../types/types';
import { getIngredientsFailed, getIngredientsRequest, getIngredientsSuccess } from '../actions/ingrediens';
import { createReducer } from '@reduxjs/toolkit';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  isError: false,
}

export const ingredientsReducer = createReducer(initialState, builder => {
  builder
    .addCase(getIngredientsRequest, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(getIngredientsSuccess, (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
      state.isError = false;
    })
    .addCase(getIngredientsFailed, (state) => {
      state.ingredients = [];
      state.isLoading = false;
      state.isError = true;
    })
})
