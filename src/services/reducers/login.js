import { getCookie } from '../../utils/cookie';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/login';


const initialState = {
    isAuth: false,
    loginRequest: false,
    loginFailure: false,
    status: null,

};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
};