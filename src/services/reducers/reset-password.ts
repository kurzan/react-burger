import { createReducer } from '@reduxjs/toolkit';
import { fargotPasswordFailed, fargotPasswordRequest, fargotPasswordSuccess, resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess, TResetPasswordActions } from '../actions/reset-password';

type TResetPasswortState = {
  status: string | null;
  forgotRequest: boolean;
  fargotSuccess: boolean;
  forgotFailed: boolean;
  resetRequest: boolean;
  resetSuccess: boolean;
  resetFailure: boolean;
}

const initialState: TResetPasswortState = {
  status: null,
  forgotRequest: false,
  fargotSuccess: false,
  forgotFailed: false,
  resetRequest: false,
  resetSuccess: false,
  resetFailure: false
}

export const resetPasswordReducer = createReducer(initialState, builder => {
  builder
    .addCase(fargotPasswordRequest, (state) => {
      state.status = 'Идет отправка данных';
      state.forgotRequest = true;
      state.fargotSuccess = false;
      state.forgotFailed = false;
    })
    .addCase(fargotPasswordSuccess, (state, action) => {
      state.status = action.payload;
      state.forgotRequest = false;
      state.fargotSuccess = true;
      state.forgotFailed = false;
    })
    .addCase(fargotPasswordFailed, (state, action) => {
      state.status = action.payload;
      state.forgotRequest = false;
      state.fargotSuccess = false;
      state.forgotFailed = true;
    })
    .addCase(resetPasswordRequest, (state) => {
      state.status = 'Идет отправка данных';
      state.resetRequest = true;
      state.resetFailure = false;
    })
    .addCase(resetPasswordSuccess, (state, action) => {
      state.status = action.payload;
      state.resetRequest = false;
      state.resetFailure = false;
    })
    .addCase(resetPasswordFailed, (state, action) => {
      state.status = action.payload;
      state.resetRequest = false;
      state.resetFailure = true;
    })
})
