import type { TOrder } from '../types/types';
import { postOrderFailed, postOrderRequest, postOrderSuccess, TOrderActions } from '../actions/order'; 
import { createReducer } from '@reduxjs/toolkit';

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

export const orderReducer = createReducer(initialState, builder => {
  builder
    .addCase(postOrderRequest, (state) => {
      state.orderRequest = true;
      state.orderFailed = false;
    })
    .addCase(postOrderSuccess, (state, action) => {
      state.order = action.payload;
      state.orderRequest = false;
      state.orderFailed = false;
    })
    .addCase(postOrderFailed, (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    })
})
