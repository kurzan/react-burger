import { apiRequest } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => (dispatch) => {

  dispatch({
    type: GET_INGREDIENTS_REQUEST
  })

  apiRequest('ingredients')
    .then(({ data }) => 
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data
      })
      )
    .catch(err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    })
};
