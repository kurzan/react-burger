export const NORMA_URL = 'https://norma.nomoreparties.space/api';

export const isResponseOk = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

export const apiRequest = (url, options) => {
  return fetch(`${NORMA_URL}/${url}`, options)
  .then(response => isResponseOk(response))
};