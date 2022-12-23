import { apiRequest } from '../../utils/burger-api';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const postResetPassword = (password, emailCode) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(  {
      "password": password,
      "token": emailCode
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({
    type: RESET_PASSWORD_REQUEST
  })

  apiRequest('password-reset/reset', options)
    .then(status => dispatch({
      type: RESET_PASSWORD_SUCCESS,
      status
    }))
    .catch(err => dispatch({
      type: RESET_PASSWORD_FAILED,
      err
    }))

};