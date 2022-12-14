export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';

export const selectIngredient = (ingredient, key) => ({
  type: ADD_INGREDIENT,
  ingredient: {...ingredient, key}
})

export const selectBun = (bun) => ({
  type: ADD_BUN,
  bun
})

export const removeIngredient = (key) => ({
  type: REMOVE_INGREDIENT,
  key
})

