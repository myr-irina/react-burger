import { getCookie, setCookie } from './cookies';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

function requestUrl(url, options) {
  return fetch(url, options)
    .then(checkResponse)
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

export const resetPasswordRequest = email => {
  return requestUrl(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  });
};

export const createNewPasswordRequest = formData => {
  return requestUrl(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      password: formData.password,
      token: formData.token,
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

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);

    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      console.log(refreshData, 'jwt expired, refreshData received');

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      let authToken;

      if (refreshData.accessToken.indexOf('Bearer') === 0) {
        authToken = refreshData.accessToken.split('Bearer ')[1];
      }

      if (authToken) {
        setCookie('token', authToken);
        console.log(authToken, 'token засетился в куках');
      }

      options.headers.authorization = 'Bearer ' + authToken;

      const res = await fetch(url, options);
      console.log(res, 'res после повторного запроса');
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  console.log(getCookie('token'));
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
  }).then(data => {
    if (data?.success) {
      return data;
    }
    return Promise.reject(data);
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

export const updateUserRequest = user => {
  return fetchWithRefresh(`${BASE_URL}/api/auth/user`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(user),
  }).then(data => {
    if (data?.success) {
      return data;
    }
    return Promise.reject(data);
  });
};
