import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED } from '../actions/ingrediens';

const initialState = {
  ingredients: [],
  isLoading: false,
  isError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        isLoading: false,
        isError: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        isLoading: false,
        isError: true
      }
    }

    default:
      return state;
  }

};
