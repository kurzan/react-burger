import type { TIngredient } from '../types/types';
import { moveIngredient, removeIngredient, resetIngredient, selectBun, selectIngredient, TSelectedIngredientActions } from '../actions/selected-ingredients'; 
import { createReducer } from '@reduxjs/toolkit';

type TSelectedIngredientsState = {
  bun: TIngredient | null;
  selectedIngredients: TIngredient[];
}

const initialState: TSelectedIngredientsState = {
  bun: null,
  selectedIngredients: [],
}

export const selectedIngredientsReducer = createReducer(initialState, builder => {
  builder
    .addCase(selectBun, (state, action) => {
      state.bun = action.payload.bun;
    })
    .addCase(selectIngredient, (state, action) => {
      state.selectedIngredients = [...state.selectedIngredients, action.payload.ingredient];
    })
    .addCase(removeIngredient, (state, action) => {
      state.selectedIngredients = [...state.selectedIngredients].filter(item => item.key !== action.payload.key)
    })
    .addCase(resetIngredient, (state) => {
      state.bun = null;
      state.selectedIngredients = [];
    })
    .addCase(moveIngredient, (state, action) => {
      const data = [...state.selectedIngredients];
      data.splice(action.payload.hoverIndex, 0, data.splice(action.payload.dragIndex, 1)[0]);
      state.selectedIngredients = data;
    })
    .addDefaultCase(state => {
      return state;
    })
})
