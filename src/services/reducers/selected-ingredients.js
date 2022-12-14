import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT, 
  RESET_INGREDIENTS,
  ADD_BUN } from '../actions/selected-ingredients';

const initialState = {
  bun: null,
  selectedIngredients: [],
  allIngredients: []
}

export const selectedIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun
      }
    }

    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.ingredient]
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(item => item.key !== action.key)
      }
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: []
      }
    }

    default:
      return state;
  }

};