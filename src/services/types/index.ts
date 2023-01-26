import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TCurrentIngredientActions } from '../actions/current-ingredient';
import { TIngredientsActions } from '../actions/ingrediens';
import { TOrderActions } from '../actions/order';
import { TResetPasswordActions } from '../actions/reset-password';
import { TSelectedIngredientActions } from '../actions/selected-ingredients';
import { TUserActions } from '../actions/user';

type TApplicationActions = 
  | TCurrentIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TResetPasswordActions
  | TSelectedIngredientActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;