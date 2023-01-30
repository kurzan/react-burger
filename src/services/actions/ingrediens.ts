import { apiRequest } from '../../utils/burger-api';
import type { TIngredient } from '../types/types';
import { AppDispatch, AppThunk } from '../types/index';
import { createAction } from '@reduxjs/toolkit';

export const getIngredientsRequest = createAction('GET_INGREDIENTS_REQUEST');
export const getIngredientsSuccess = createAction<Array<TIngredient>, 'GET_INGREDIENTS_SUCCESS'>('GET_INGREDIENTS_SUCCESS');
export const getIngredientsFailed = createAction('GET_INGREDIENTS_FAILED');


export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {

  dispatch(getIngredientsRequest())

  apiRequest('ingredients')
    .then(({ data }) => {
      dispatch(getIngredientsSuccess(data))
    }
      )
    .catch(err => {
      dispatch(getIngredientsFailed())
    })
};


export type TIngredientsActions = 
    | ReturnType<typeof getIngredientsRequest>
    | ReturnType<typeof getIngredientsSuccess>
    | ReturnType<typeof getIngredientsFailed>;