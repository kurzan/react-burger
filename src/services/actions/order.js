import { NORMA_URL, isresponseOk } from '../../utils/burger-api';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const postOrder = (ingredients) => (dispatch) => {
  dispatch({
    type: POST_ORDER_REQUEST
  })

  fetch(`${NORMA_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({ingredients: ingredients.map(elem => elem._id)}),
    headers: {
      'Content-Type': 'application/json'
  }})
  .then(response => isresponseOk(response))
  .then(data => 
    dispatch({
      type: POST_ORDER_SUCCESS,
      order: data
    }))
  .catch(err => {
    dispatch({
      type: POST_ORDER_FAILED,
    })
  })

}