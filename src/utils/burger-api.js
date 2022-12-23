export const NORMA_URL = 'https://norma.nomoreparties.space/api';

export const isResponseOk = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
};

export const apiRequest = (url, options) => {
  return fetch(`${NORMA_URL}/${url}`, options)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      return data
    }
    
    return Promise.reject(data.message)
  })
};