import { 
  POST_ORDER_REQUEST, 
  POST_ORDER_SUCCESS, 
  POST_ORDER_FAILED } from '../actions/order';

import type { TOrder } from '../types/types';
import type { TOrderActions } from '../actions/order'; 

type TOrderState = {
  order: Partial<TOrder>;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TOrderState = {
  order: {},
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }

    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order.order,
        orderRequest: false,
        orderFailed: false
      }
    }

    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }

    default:
      return state;
  }

};