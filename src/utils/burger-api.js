const NORMA_URL = 'https://norma.nomoreparties.space/api';

const isresponseOk = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

const getIngridients = (setIngredients, setIsError) => {
  return fetch(`${NORMA_URL}/ingredients`)
  .then(response => isresponseOk(response))
  .then(data => setIngredients(data.data))
  .catch(err => {
    setIsError({status: true, text: err})
  })
};

export default getIngridients;