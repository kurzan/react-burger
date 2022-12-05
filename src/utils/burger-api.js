const NORMA_URL = 'https://norma.nomoreparties.space/api';

const isresponseOk = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

export const getIngridients = (setIngredients, setIsError) => {
  return fetch(`${NORMA_URL}/ingredients`)
  .then(response => isresponseOk(response))
  .then(data => setIngredients(data.data))
  .catch(err => {
    setIsError({status: true, text: err})
  })
};


export const postOrder = (setOrder, ingredients, setIsError) => {
  return fetch(`${NORMA_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({ingredients: ingredients.map(elem => elem._id)}),
    headers: {
      'Content-Type': 'application/json'
  }})
  .then(response => isresponseOk(response))
  .then(data => setOrder({ name: data.name, number: data.order.number }))
  .catch(err => {
    setIsError({status: true, text: err})
  })
}

