import { getCookie, setCookie } from "./cookie"; 

export const NORMA_URL = 'https://norma.nomoreparties.space/api';

export const apiRequest = (url: string, options?: {}) => {
  return fetch(`${NORMA_URL}/${url}`, options)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      return data
    }
    return Promise.reject(data.message)
  })
};


export const refreshToken = async ()  => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "token": getCookie('refreshToken')
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await apiRequest('auth/token', options)
    .then(res => {
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
};
