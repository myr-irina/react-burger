export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkReponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkReponse)
    .then(data => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
};

export const createOrder = ingredients => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then(checkReponse)
    .then(data => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
