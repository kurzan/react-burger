import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
 } from '../actions/user';


const initialState = {
  isAuth: false,
  user: {},
  status: null,
  registerRequest: false,
  registerFailure: false,
  loginRequest: false,
  loginFailure: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailure: false
};

export const userReducer = (state = initialState, action) => {
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
        isAuth: true,
        registerRequest: false,
        registerFailure: false
      }
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        isAuth: false,
        status: action.err,
        registerRequest: false,
        registerFailure: true
      }
    }

    case LOGIN_REQUEST: {
      return {
          ...state,
          loginRequest: true,
          loginFailure: false
     }
  }

  case LOGIN_SUCCESS: {
      return {
          ...state,
          isAuth: true,
          loginRequest: false,
          loginFailure: false
     }
  }

  case LOGIN_FAILED: {
      return {
          ...state,
          isAuth: false,
          loginRequest: false,
          loginFailure: true,
          status: action.status
     }
  }

  case LOGOUT_REQUEST: {
    return {
        ...state,
        isAuth: true,
        logoutRequest: true,
        logoutFailure: false,
    }
  }

  case LOGOUT_SUCCESS: {
      return {
          ...state,
          isAuth: false,
          status: action.res.message,
          logoutRequest: false,
          logoutFailure: false,
      }
  }

  case LOGOUT_FAILED: {
      return {
          ...state,
          isAuth: true,
          status: action.message,
          logoutRequest: false,
          logoutFailure: true,
      }
  }

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
      getUserRequest: false,
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
