import { createAction } from '@reduxjs/toolkit';
import { apiRequest } from '../../utils/burger-api';
import { AppDispatch, AppThunk } from '../types/index';

//FARGOT PASSWORD

export const fargotPasswordRequest = createAction('FORGOT_PASSWORD_REQUEST');
export const fargotPasswordSuccess = createAction<string, 'FORGOT_PASSWORD_SUCCESS'>('FORGOT_PASSWORD_SUCCESS');
export const fargotPasswordFailed = createAction<string, 'FORGOT_PASSWORD_FAILED'>('FORGOT_PASSWORD_FAILED');

export const getForgotPassword: AppThunk = (email: string, history: any) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ 'email': email }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch(fargotPasswordRequest())
  
  apiRequest('password-reset', options)
    .then(status => dispatch(fargotPasswordSuccess(status)))
    .then(() => history.push({pathname: '/reset-password'}))
    .catch((err) => dispatch(fargotPasswordFailed(err)))
};

//RESET_PASSWORD

export const resetPasswordRequest = createAction('RESET_PASSWORD_REQUEST');
export const resetPasswordSuccess = createAction<string, 'RESET_PASSWORD_SUCCESS'>('RESET_PASSWORD_SUCCESS');
export const resetPasswordFailed = createAction<string, 'RESET_PASSWORD_FAILED'>('RESET_PASSWORD_FAILED');

export const postResetPassword: AppThunk = (password: string, emailCode: string, history: any) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(  {
      "password": password,
      "token": emailCode
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch(resetPasswordRequest())

  apiRequest('password-reset/reset', options)
    .then(status => dispatch(resetPasswordSuccess(status)))
    .then(() => history.push({pathname: '/login'}))
    .catch(err => dispatch(resetPasswordFailed(err)))
};

export type TResetPasswordActions = 
| ReturnType<typeof fargotPasswordRequest>
| ReturnType<typeof fargotPasswordSuccess>
| ReturnType<typeof fargotPasswordFailed>
| ReturnType<typeof resetPasswordRequest>
| ReturnType<typeof resetPasswordSuccess>
| ReturnType<typeof resetPasswordFailed>;
