import { apiRequest, refreshToken } from '../../utils/burger-api';
import { RESET_INGREDIENTS } from '../actions/selected-ingredients';
import { getCookie } from '../../utils/cookie'; 

import { TIngredient } from '../../utils/types';
import { TOrder } from '../../utils/types';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED:'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly order: {order: TOrder};
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export type TOrderActions =
  | IPostOrderRequestAction
  | IPostOrderSuccessAction
  | IPostOrderFailedAction;

export const postOrder = (ingredients:TIngredient[]) => (dispatch: any) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ingredients: ingredients && ingredients.map(elem => elem._id)}),
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
  }

  dispatch({
    type: POST_ORDER_REQUEST
  })

  apiRequest('orders', options)
  .then(data => 
    dispatch({
      type: POST_ORDER_SUCCESS,
      order: data
    }))
  .then(err => dispatch({type: RESET_INGREDIENTS}))
  .catch(err => {
    if (err === 'jwt expired') {
      refreshToken()
      .then(() => dispatch(postOrder(ingredients)))
    } else {
      dispatch({
        type: POST_ORDER_FAILED,
      })
    }
  })
};
