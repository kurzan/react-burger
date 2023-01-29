import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionCreator } from 'redux';
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
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, never, TApplicationActions>
>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;