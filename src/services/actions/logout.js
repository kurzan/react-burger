import { apiRequest } from '../../utils/burger-api';
import { deleteCookie, getCookie } from '../../utils/cookie';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_DEL_STATUS = 'LOGOUT_DEL_STATUS';

export const logout = (history) => (dispatch) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            "token": getCookie('refreshToken')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

    dispatch({type: LOGOUT_REQUEST});

    apiRequest('auth/logout', options)
      .then((res) => {
        dispatch({type: LOGOUT_SUCCESS, res});
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      })
      .then(() => history.push({pathname: '/login'}))
      .catch(err => {
        dispatch({
            type: LOGOUT_FAILED,
            err
        });
      })
}