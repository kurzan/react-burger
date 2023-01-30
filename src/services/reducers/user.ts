import { createReducer } from '@reduxjs/toolkit';
import { editUserFailed, editUserRequest, editUserSuccess, getUserFailed, getUserRequest, getUserSuccess, loginFailed, loginRequest, loginSuccess, logoutFailed, logoutRequest, logoutSuccess, registerFailed, registerRequest, registerSuccess, TUserActions } from '../actions/user';
import type { TUser } from '../types/types';

 type TUserState = {
  user: TUser | null;
  status: string | null;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailure: boolean;
  loginRequest: boolean;
  loginFailure: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  getUserRequest: boolean;
  getUserFailure: boolean;
  editUserRequest: boolean;
  editUserSuccess: boolean;
  editUserFailure: boolean;
};

const initialState: TUserState = {
  user: null,
  status: null,
  registerRequest: false,
  registerSuccess: false,
  registerFailure: false,
  loginRequest: false,
  loginFailure: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailure: false,
  editUserRequest: false,
  editUserSuccess: false,
  editUserFailure: false,
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(registerRequest, (state) => {
      state.status = null;
      state.registerRequest = true;
      state.registerFailure = false;
    })
    .addCase(registerSuccess, (state, action) => {
      state.status = 'Успешная регистрация';
      state.user = action.payload;
      state.registerRequest = false;
      state.registerSuccess = true;
      state.registerFailure = false;
    })
    .addCase(registerFailed, (state, action) => {
      state.status = action.payload;
      state.registerRequest = false;
      state.registerSuccess = false;
      state.registerFailure = true;
    })
    .addCase(loginRequest, (state) => {
      state.loginRequest = true;
      state.loginFailure = false;
    })
    .addCase(loginSuccess, (state, action) => {
      state.user = action.payload;
      state.loginRequest = false;
      state.loginFailure = false;
    })
    .addCase(loginFailed, (state, action) => {
      state.loginRequest = false;
      state.loginFailure = true;
      state.status = action.payload;
    })
    .addCase(logoutRequest, (state) => {
      state.logoutRequest = true;
      state.logoutFailed = false;
    })
    .addCase(logoutSuccess, (state, action) => {
      state.user = null;
      state.status = action.payload;
      state.logoutRequest = false;
      state.logoutFailed = false;
    })
    .addCase(logoutFailed, (state, action) => {
      state.status = action.payload;
      state.logoutRequest = false;
      state.logoutFailed = true;
    })
    .addCase(getUserRequest, (state) => {
      state.getUserRequest = true;
      state.getUserFailure = false;
    })
    .addCase(getUserSuccess, (state, action) => {
      state.user = action.payload.user;
      state.getUserRequest = true;
      state.getUserFailure = false;
    })
    .addCase(getUserFailed, (state, action) => {
      state.status = action.payload;
      state.getUserRequest = false;
      state.getUserFailure = true;
    })
    .addCase(editUserRequest, (state) => {
      state.editUserRequest = true;
      state.editUserFailure = false;
    })
    .addCase(editUserSuccess, (state, action) => {
      state.user = action.payload;
      state.editUserRequest = false;
      state.editUserSuccess = true;
      state.editUserFailure = false;
    })
    .addCase(editUserFailed, (state) => {
      state.editUserRequest = false;
      state.editUserFailure = true;
    })
    .addDefaultCase((state) => {
      return state;
    })
})

