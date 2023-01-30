import type { TIngredient } from "../types/types";
import { createAction } from "@reduxjs/toolkit";

export const setCurrentIngredient = createAction<TIngredient, 'SET_CURRENT_INGREDIENT'>('SET_CURRENT_INGREDIENT');
export const resetCurrentIngredient = createAction('RESET_CURRENT_INGREDIENT');

export type TCurrentIngredientActions = 
  | ReturnType<typeof setCurrentIngredient>
  | ReturnType<typeof resetCurrentIngredient>;