import {
  apiRequest
} from "../../utils/burger-api";
import {
  getCookie
} from "../../utils/cookie";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const getUserInfo = () => (dispatch) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
  }

  dispatch({
    type: GET_USER_REQUEST
  })

  apiRequest('auth/user', options)
    .then(({
      user
    }) => dispatch({
      type: GET_USER_SUCCESS,
      user
    }))
    .catch(err => dispatch({
      type: GET_USER_FAILED
    }, err))

};

export const updateUserInfo = (form) => (dispatch) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }
};