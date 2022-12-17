import { apiRequest } from '../../utils/burger-api';
import { RESET_INGREDIENTS } from '../actions/selected-ingredients'; 

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const postOrder = (ingredients) => (dispatch) => {
const options = {
  method: 'POST',
  body: JSON.stringify({ingredients: ingredients.map(elem => elem._id)}),
  headers: {
    'Content-Type': 'application/json'
  }}

  dispatch({
    type: POST_ORDER_REQUEST
  })

  apiRequest('orders', options)
  .then(data => 
    dispatch({
      type: POST_ORDER_SUCCESS,
      order: data
    }))
  .then(err => dispatch({type: RESET_INGREDIENTS}))
  .catch(err => {
    dispatch({
      type: POST_ORDER_FAILED,
    })
  })
};
