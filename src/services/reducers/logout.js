import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_DEL_STATUS
} from '../actions/logout';

const initialState = {
    logoutStatus: null,
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailure: false
};

export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutSuccess: false,
                logoutFailure: false,
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutStatus: action.res.message,
                logoutRequest: false,
                logoutSuccess: true,
                logoutFailure: false,
            }
        }

        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutStatus: action.message,
                logoutRequest: false,
                logoutSuccess: false,
                logoutFailure: true,
            }
        }

        case LOGOUT_DEL_STATUS: {
            return {
                ...state,
                logoutStatus: null,
                logoutRequest: false,
                logoutSuccess: false,
                logoutFailure: false,
            }
        }

        default:
            return state;
    }
};