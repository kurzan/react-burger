import { userReducer } from "./user";
import { editUserFailed, editUserRequest, editUserSuccess, getUserFailed, getUserRequest, getUserSuccess, loginFailed, loginRequest, loginSuccess, logoutFailed, logoutRequest, logoutSuccess, registerFailed, registerRequest, registerSuccess, TUserActions } from '../actions/user';


describe('user reducer', () => {

  it('should handle registerSuccess', () => {
    const action = {
      type: registerSuccess,
      payload: 'test'
    };
    const expectedState = {
      user: 'test',
      status: 'Успешная регистрация',
      registerRequest: false,
      registerSuccess: true,
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
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle loginSuccess', () => {
    const action = {
      type: loginSuccess,
      payload: 'test'
    };
    const expectedState = {
      user: 'test',
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
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle logoutSuccess', () => {
    const action = {
      type: logoutSuccess,
      payload: 'test'
    };
    const expectedState = {
      user: null,
      status: 'test',
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
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle getUserSuccess', () => {
    const action = {
      type: getUserSuccess,
      payload: {user: 'test'},
    }
    const expectedState = {
      user: 'test',
      status: null,
      registerRequest: false,
      registerSuccess: false,
      registerFailure: false,
      loginRequest: false,
      loginFailure: false,
      logoutRequest: false,
      logoutFailed: false,
      getUserRequest: true,
      getUserFailure: false,
      editUserRequest: false,
      editUserSuccess: false,
      editUserFailure: false,
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle editUserSuccess', () => {
    const action = {
      type: editUserSuccess,
      payload: 'test'
    };
    const expectedState = {
      user: 'test',
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
      editUserSuccess: true,
      editUserFailure: false,
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});