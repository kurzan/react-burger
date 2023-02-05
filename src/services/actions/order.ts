import { apiRequest, refreshToken } from '../../utils/burger-api';
import { resetIngredient } from '../actions/selected-ingredients';
import { getCookie } from '../../utils/cookie'; 
import { AppDispatch, AppThunk } from '../types';

import { TIngredient } from '../types/types';
import { TOrder } from '../types/types';
import { createAction } from '@reduxjs/toolkit';

export const postOrderRequest = createAction('POST_ORDER_REQUEST');
export const postOrderSuccess = createAction<TOrder,'POST_ORDER_SUCCESS'>('POST_ORDER_SUCCESS');
export const postOrderFailed = createAction('POST_ORDER_FAILED');

export type TOrderActions =
  | ReturnType<typeof postOrderRequest>
  | ReturnType<typeof postOrderSuccess>
  | ReturnType<typeof postOrderFailed>;

export const postOrder: AppThunk = (ingredients:TIngredient[]) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ingredients: ingredients && ingredients.map(elem => elem._id)}),
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
  }

  dispatch(postOrderRequest())

  apiRequest('orders', options)
  .then(data => 
    dispatch(postOrderSuccess(data.order)))
  .then(err => dispatch(resetIngredient()))
  .catch(err => {
    if (err === 'jwt expired') {
      refreshToken()
      .then(() => dispatch(postOrder(ingredients)))
    } else {
      dispatch(postOrderFailed())
    }
  })
};
