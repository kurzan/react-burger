import { createAction } from "@reduxjs/toolkit";
import { TIngredient } from "../types/types";

export const selectIngredient = createAction('ADD_INGREDIENT', (ingredient: TIngredient, key: string) => {
  return {
    payload: {
      ingredient: {...ingredient, key}
    }
  }
});

export const removeIngredient = createAction('REMOVE_INGREDIENT', (key: string) => {
  return {
    payload: {
      key
    }
  }
});

export const resetIngredient = createAction('RESET_INGREDIENTS');

export const selectBun = createAction('ADD_BUN', (bun: TIngredient) => {
  return {
    payload: {
      bun
    }
  }
});

export const moveIngredient = createAction('MOVE_INGREDIENT', (dragIndex: number, hoverIndex: number) => {
  return {
    payload: {
      dragIndex,
      hoverIndex
    }
  }
});

export type TSelectedIngredientActions = 
| ReturnType<typeof selectIngredient>
| ReturnType<typeof removeIngredient>
| ReturnType<typeof resetIngredient>
| ReturnType<typeof selectBun>
| ReturnType<typeof moveIngredient>;