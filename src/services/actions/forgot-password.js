import { apiRequest } from '../../utils/burger-api';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const getForgotPassword = (email, history) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ 'email': email }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({
    type: FORGOT_PASSWORD_REQUEST
  })
  
  apiRequest('password-reset', options)
    .then(status => dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      status
    }))
    .then(() => history.push({pathname: '/reset-password'}))
    .catch(() => dispatch({
      type: FORGOT_PASSWORD_FAILED
    }))

};
