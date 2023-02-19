import {  postOrderRequest, postOrderSuccess, postOrderFailed } from '../actions/order';
import { orderReducer } from './order';

describe('Order Reducer', () => {
  it('handles postOrderRequest action', () => {
    const initialState = {
      order: {},
      orderRequest: false,
      orderFailed: false
    }
    const action = {
      type: postOrderRequest
    }
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      order: {},
      orderRequest: true,
      orderFailed: false
    });
  });

  it('handles postOrderSuccess action', () => {
    const initialState = {
      order: {},
      orderRequest: false,
      orderFailed: false
    }
    const payload = {
      firstName: 'John',
      lastName: 'Doe'
    }
    const action = {
      type: postOrderSuccess,
      payload
    }
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      order: payload,
      orderRequest: false,
      orderFailed: false
    });
  });

  it('handles postOrderFailed action', () => {
    const initialState = {
      order: {},
      orderRequest: false,
      orderFailed: false
    }
    const action = {
      type: postOrderFailed
    }
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      order: {},
      orderRequest: false,
      orderFailed: true
    });
  });
});