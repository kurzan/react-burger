import { setCurrentIngredient, resetCurrentIngredient } from '../actions/current-ingredient';
import { currentIngredientReducer } from './current-ingredient';

describe('Current Ingredient Reducer,', () => {
  it('should set the currentIngredient in state when action passed is SET_CURRENT_INGREDIENT', () => {
    const action = {
      type: setCurrentIngredient.type,
      payload: {
        id: 1,
        name: 'Bread'
      }
    };
    const expectedState = {
      currentIngredient: {
        id: 1,
        name: 'Bread'
      }
    }
    expect(currentIngredientReducer({}, action)).toEqual(expectedState);
  });

  it('should reset the currentIngredient in state when action passed is RESET_CURRENT_INGREDIENT', () => {
    const action = { type: resetCurrentIngredient.type };
    const expectedState = { currentIngredient: {} };
    expect(currentIngredientReducer({}, action)).toEqual(expectedState);
  });
});