import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILED } from '../actions/register';

const initialState = {
  status: null,
  registerRequest: false,
  registerFailure: false
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        status: null,
        registerRequest: true,
        registerFailure: false
      }
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        status: 'Успешная регистрация',
        registerRequest: false,
        registerFailure: false
      }
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        status: action.err,
        registerRequest: false,
        registerFailure: true
      }
    }

    default:
      return state;
  }
};
