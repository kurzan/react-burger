import { 
  POST_ORDER_REQUEST, 
  POST_ORDER_SUCCESS, 
  POST_ORDER_FAILED } from '../actions/order';

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
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
        order: {},
        orderRequest: false,
        orderFailed: true
      }
    }

    default:
      return state;
  }

};