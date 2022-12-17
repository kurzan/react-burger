import { combineReducers } from 'redux';
import { currentIngredientReducer } from './current-ingredient';
import { ingredientsReducer } from './ingrediens';
import { orderReducer } from './order';
import { selectedIngredientsReducer } from './selected-ingredients';

export const rootReducer = combineReducers({
  currentIngredientReducer,
  ingredientsReducer,
  orderReducer,
  selectedIngredientsReducer
})