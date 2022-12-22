import { 
  FORGOT_PASSWORD_REQUEST, 
  FORGOT_PASSWORD_SUCCESS, 
  FORGOT_PASSWORD_FAILED } from '../actions/forgot-password';

const initialState = {
  forgotRequest: false,
  forgotFailed: false
}

export const passwordForgotReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotRequest: true,
        forgotFailed: false
      }
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: false
      }
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: true
      }
    }
  
    default:
      return state;
  }
}