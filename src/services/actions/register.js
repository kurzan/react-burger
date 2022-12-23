import { apiRequest } from "../../utils/burger-api"; 

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const registerUser = (name, email, password) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name 
  } ),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({
    type: REGISTER_REQUEST
  });

  apiRequest('auth/register', options)
    .then(() => dispatch({
      type: REGISTER_SUCCESS
    }))
    .catch(err => {
      dispatch({
        type: REGISTER_FAILED,
        err
      })
    })
};