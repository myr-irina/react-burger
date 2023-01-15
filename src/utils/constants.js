export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const checkReponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};
