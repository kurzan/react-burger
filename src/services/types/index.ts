import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { store } from '../store';
import { TCurrentIngredientActions } from '../actions/current-ingredient';
import { TIngredientsActions } from '../actions/ingrediens';
import { TOrderActions } from '../actions/order';
import { TResetPasswordActions } from '../actions/reset-password';
import { TSelectedIngredientActions } from '../actions/selected-ingredients';
import { TUserActions } from '../actions/user';
import { rootReducer } from '../reducers';
import { TWsOrdersActions } from '../actions/ws-orders';

type TApplicationActions = 
  | TCurrentIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TResetPasswordActions
  | TSelectedIngredientActions
  | TUserActions
  | TWsOrdersActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, never, TApplicationActions>
>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;