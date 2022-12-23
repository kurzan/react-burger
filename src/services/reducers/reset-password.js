import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../actions/reset-password';

const initialState = {
  status: null,
  resetRequest: false,
  resetFailure: false
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetRequest: true,
        resetFailure: false
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        status: action.status,
        resetRequest: false,
        resetFailure: false
      }
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        status: action.err,
        resetRequest: false,
        resetFailure: true
      }
    }
    default:
      return state;
  }
}