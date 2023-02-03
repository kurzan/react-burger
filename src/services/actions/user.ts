import { apiRequest, refreshToken } from "../../utils/burger-api"; 
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { TUser } from "../types/types";
import { AppDispatch, AppThunk } from '../types/index';
import { createAction } from "@reduxjs/toolkit";

//REGISTER USER

export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction<TUser, 'REGISTER_SUCCESS'>('REGISTER_SUCCESS');
export const registerFailed = createAction<string, 'REGISTER_FAILED'>('REGISTER_FAILED');


export const registerUser: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name 
  } ),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch(registerRequest());

  apiRequest('auth/register', options)
    .then((res) => {
      dispatch(registerSuccess(res))
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch(err => {
      if (typeof(err) !== 'object' ) {
        dispatch(registerFailed(err)) 
      } else {
        dispatch(registerFailed('Непредвиденная ошибка. Попробуйте заново')) 
      }

    })
};

//LOGIN

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction<TUser, 'LOGIN_SUCCESS'>('LOGIN_SUCCESS');
export const loginFailed = createAction<string, 'LOGIN_FAILED'>('LOGIN_FAILED');

export const loginning: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  const options = {
      method: 'POST',
      body: JSON.stringify({
          "email": email, 
          "password": password 
      } ),
      headers: {
        'Content-Type': 'application/json'
      }
    }

  dispatch(loginRequest());

  apiRequest('auth/login', options)
    .then(res => {
      dispatch(loginSuccess(res.user));
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch(status => {
      dispatch(loginFailed(status));
    })
};

//LOGOUT

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction<string, 'LOGOUT_SUCCESS'>('LOGOUT_SUCCESS');
export const logoutFailed = createAction<string, 'LOGOUT_FAILED'>('LOGOUT_FAILED');


export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  const options = {
      method: 'POST',
      body: JSON.stringify({
          "token": getCookie('refreshToken')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

  dispatch(logoutRequest());

  apiRequest('auth/logout', options)
    .then((res) => {
      dispatch(logoutSuccess(res.message));
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    })
    .catch(err => {
      dispatch(logoutFailed(err));
    })
}

//GET_USER

export const getUserRequest = createAction('GET_USER_REQUEST');
export const getUserSuccess = createAction<{user: TUser}, 'GET_USER_SUCCESS'>('GET_USER_SUCCESS');
export const getUserFailed = createAction<string, 'GET_USER_FAILED'>('GET_USER_FAILED');

export const getUserInfo: AppThunk = () => (dispatch: AppDispatch) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
  }

  dispatch(getUserRequest())

  apiRequest('auth/user', options)
    .then((res) => {
      dispatch(getUserSuccess(res))
    })
    .catch(err => {
      if (err === 'jwt expired') {
        refreshToken()
        .then(() => dispatch(getUserInfo()))
      } else {
        dispatch(getUserFailed(err))
      }
    })
};


//UPDATE_USER 

export const editUserRequest = createAction('EDIT_USER_REQUEST');
export const editUserSuccess = createAction<TUser, 'EDIT_USER_SUCCESS'>('EDIT_USER_SUCCESS');
export const editUserFailed = createAction<string, 'EDIT_USER_FAILED'>('EDIT_USER_FAILED');

export const updateUserInfo: AppThunk = (form: TUser) => (dispatch: AppDispatch) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }

  dispatch(editUserRequest());

  apiRequest('auth/user', options)
    .then(user => {
      dispatch(editUserSuccess(user.user))
    })
    .catch(err => {
      if (err === 'jwt expired') {
        refreshToken()
        .then(() => dispatch(updateUserInfo(form)))
      } else {
        dispatch(editUserFailed(err)) 
      }
    })
};


export type TUserActions = 
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailed>
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailed>
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof logoutFailed>
  | ReturnType<typeof getUserRequest>
  | ReturnType<typeof getUserSuccess>
  | ReturnType<typeof getUserFailed>
  | ReturnType<typeof editUserRequest>
  | ReturnType<typeof editUserSuccess>
  | ReturnType<typeof editUserFailed>;
