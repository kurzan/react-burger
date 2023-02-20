import { getIngredientsFailed, getIngredientsRequest, getIngredientsSuccess } from '../actions/ingrediens';
import { ingredientsReducer } from './ingrediens'; 

describe('Ingredients Reducer,', () => {
  it('should set isLoading to true when action passed is GET_INGREDIENTS_REQUEST', () => {
    const action = { type: getIngredientsRequest.type };
    const expectedState = {
      isLoading: true,
      isError: false
    }
    expect(ingredientsReducer({}, action)).toEqual(expectedState);
  });

  it('should set isLoading to false and populate ingredients when action passed is GET_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: getIngredientsSuccess.type,
      payload: [
        {
          id: 1,
          name: 'Bread'
        },
        {
          id: 2,
          name: 'Egg'
        }
      ]
    };
    const expectedState = {
      ingredients: [
        {
          id: 1,
          name: 'Bread'
        },
        {
          id: 2,
          name: 'Egg'
        }
      ],
      isLoading: false,
      isError: false
    }
    expect(ingredientsReducer({}, action)).toEqual(expectedState);
  });

  it('should set isLoading to false and set isError to true when action passed is GET_INGREDIENTS_FAILED', () => {
    const action = { type: getIngredientsFailed.type };
    const expectedState = {
      ingredients: [],
      isLoading: false,
      isError: true
    }
    expect(ingredientsReducer({}, action)).toEqual(expectedState);
  });
});