import { getCookie } from './cookies';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkReponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

function requestUrl(url, options) {
  return fetch(url, options)
    .then(checkReponse)
    .then(data => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}

export const getIngredients = () => {
  return requestUrl(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createOrder = ingredients => {
  return requestUrl(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

export const resetPassword = email => {
  return requestUrl(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const createNewPassword = password => {
  return requestUrl(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      password: password,
    }),
  });
};

export const registerRequest = userData => {
  return requestUrl(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getUser = () => {
  return requestUrl(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
  });
};

export const getRefreshToken = () => {
  return requestUrl(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });
};

export const loginRequest = form => {
  return requestUrl(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const logoutRequest = () => {
  return requestUrl(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });
};
