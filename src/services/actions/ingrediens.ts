import { apiRequest } from '../../utils/burger-api';
import type { TIngredient } from '../types/types';
import { AppDispatch, AppThunk } from '../types/index';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[]; 
}

export interface IGetIngredientsSuccessFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = 
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsSuccessFailed;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {

  dispatch({
    type: GET_INGREDIENTS_REQUEST
  })

  apiRequest('ingredients')
    .then(({ data }) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data
      })
    }
      )
    .catch(err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    })
};
