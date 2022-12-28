import { getCookie, setCookie } from "./cookie"; 

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

export const refreshToken = () => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "token": getCookie('refreshToken')
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  apiRequest('auth/token', options)
    .then(res => {
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
};


export const fetchWithAuth = async (url, options) => {
    
  await apiRequest(url, options)
    .catch(err => {
      if (err === 'jwt expired') {
        refreshToken()
      }
    })

  return apiRequest(url, options)
}