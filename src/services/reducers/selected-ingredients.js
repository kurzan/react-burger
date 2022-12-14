import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT, 
  RESET_INGREDIENTS,
  ADD_BUN,
  MOVE_INGREDIENT } from '../actions/selected-ingredients';

const initialState = {
  bun: null,
  selectedIngredients: [],
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
        bun: null,
        selectedIngredients: []
      }
    }
    case MOVE_INGREDIENT: {
      const data = [...state.selectedIngredients];
      data.splice(action.hoverIndex, 0, data.splice(action.dragIndex, 1)[0]);

      return {
        ...state,
        selectedIngredients: data,
      };
    }
    default:
      return state;
  }

};