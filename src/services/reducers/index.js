import { combineReducers } from 'redux';
import { currentIngredientReducer } from './current-ingredient';
import { ingredientsReducer } from './ingrediens';
import { orderReducer } from './order';
import { selectedIngredientsReducer } from './selected-ingredients';
import { passwordForgotReducer } from './forgot-password';
import { registerReducer } from './register';
import { resetPasswordReducer } from './reset-password';
import { loginReducer } from './login';
import { logoutReducer } from './logout'; 
import { userInfoReducer } from './user-info';

export const rootReducer = combineReducers({
  currentIngredientReducer,
  ingredientsReducer,
  orderReducer,
  selectedIngredientsReducer,
  passwordForgotReducer,
  registerReducer,
  resetPasswordReducer,
  loginReducer,
  logoutReducer,
  userInfoReducer
})