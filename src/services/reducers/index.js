import { combineReducers } from 'redux';
import { currentIngredientReducer } from './current-ingredient';
import { ingredientsReducer } from './ingrediens';
import { orderReducer } from './order';
import { selectedIngredientsReducer } from './selected-ingredients';
import { passwordForgotReducer } from './forgot-password';
import { registerReducer } from './register';
import { resetPasswordReducer } from './reset-password';

export const rootReducer = combineReducers({
  currentIngredientReducer,
  ingredientsReducer,
  orderReducer,
  selectedIngredientsReducer,
  passwordForgotReducer,
  registerReducer,
  resetPasswordReducer
})