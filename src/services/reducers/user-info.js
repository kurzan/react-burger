import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../actions/user-info';

const initialState = {
  user: {},
  getUserRequest: false,
  getUserFailure: false
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailure: false
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserRequest: true,
        getUserFailure: false
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailure: true
      }
    }

    default:
      return state;
  }
};