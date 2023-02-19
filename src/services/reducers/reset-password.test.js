import { fargotPasswordRequest, fargotPasswordSuccess, fargotPasswordFailed, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed } from '../actions/reset-password';
import { resetPasswordReducer, initialState } from './reset-password'; 

describe('ResetPassword Reducer', () => {
  it('handles fargotPasswordRequest action', () => {
    const initialState = {
      status: null,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    }
    const action = {
      type: fargotPasswordRequest
    }
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      status: 'Идет отправка данных',
      forgotRequest: true,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    });
  });

  it('handles fargotPasswordSuccess action', () => {
    const initialState = {
      status: null,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    }
    const payload = 'Сброс пароля успешно отправлен'
    const action = {
      type: fargotPasswordSuccess,
      payload
    }
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      status: payload,
      forgotRequest: false,
      fargotSuccess: true,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    });
  });

  it('handles fargotPasswordFailed action', () => {
    const initialState = {
      status: null,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    }
    const payload = 'Ошибка при отправке сообщения со сбросом пароля'
    const action = {
      type: fargotPasswordFailed,
      payload
    }
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      status: payload,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: true,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    });
  });

  it('handles resetPasswordRequest action', () => {
    const initialState = {
      status: null,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    }
    const action = {
      type: resetPasswordRequest
    }
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      status: 'Идет отправка данных',
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: true,
      resetSuccess: false,
      resetFailure: false
    });
  });

  it('handles resetPasswordSuccess action', () => {
    const initialState = {
      status: null,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    }
    const payload = 'Пароль успешно изменен'
    const action = {
      type: resetPasswordSuccess,
      payload
    }
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      status: payload,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: true,
      resetFailure: false
    });
  });

  it('handles resetPasswordFailed action', () => {
    const initialState = {
      status: null,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: false
    }
    const payload = 'Ошибка при изменении пароля'
    const action = {
      type: resetPasswordFailed,
      payload
    }
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      status: payload,
      forgotRequest: false,
      fargotSuccess: false,
      forgotFailed: false,
      resetRequest: false,
      resetSuccess: false,
      resetFailure: true
    });
  });
});