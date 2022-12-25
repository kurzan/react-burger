import { apiRequest } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginning = (email, password, history) => (dispatch) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            "email": email, 
            "password": password 
        } ),
        headers: {
          'Content-Type': 'application/json'
        }
      }

    dispatch({type: LOGIN_REQUEST});

    apiRequest('auth/login', options)
      .then(res => {
        dispatch({type: LOGIN_SUCCESS});
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);
      })
      .then(() => history.push({pathname: '/'}))
      .catch(status => {
        dispatch({ 
            type: LOGIN_FAILED,
            status
        });
      })

};
