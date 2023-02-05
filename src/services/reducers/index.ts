import { combineReducers } from 'redux';
import { currentIngredientReducer } from './current-ingredient';
import { ingredientsReducer } from './ingrediens';
import { orderReducer } from './order';
import { selectedIngredientsReducer } from './selected-ingredients';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from './user';
import { WsOrdersReducer } from './ws-orders';

export const rootReducer = combineReducers({
  currentIngredientReducer,
  ingredientsReducer,
  orderReducer,
  selectedIngredientsReducer,
  userReducer,
  resetPasswordReducer,
  WsOrdersReducer
})