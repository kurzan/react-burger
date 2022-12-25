import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_SUCCESS, 
  FORGOT_PASSWORD_FAILED
} from '../actions/reset-password';

const initialState = {
  status: null,
  forgotRequest: false,
  forgotFailed: false,
  resetRequest: false,
  resetFailure: false
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        status: 'Идет отправка данных',
        forgotRequest: true,
        forgotFailed: false
      }
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        status: action.status,
        forgotRequest: false,
        forgotFailed: false
      }
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        status: action.err,
        forgotRequest: false,
        forgotFailed: true
      }
    }
    
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        status: 'Идет отправка данных',
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