import { getCookie, setCookie } from './cookies';
import { BASE_URL } from './constants';
import {
  TFormData,
  TResponse,
  TUser,
  TUserLogin,
  TUserUpdate,
} from '../services/types/types-api';
import { TIngredientType } from '../services/types/types-ingredient';

export interface IResponseBody {
  success: boolean;
}
export interface IGetBurgerIngredientsResponse extends IResponseBody {
  data: Array<TIngredientType>;
}

export const WS_ORDERS_ALL: string =
  'wss://norma.nomoreparties.space/orders/all';
export const WS_ORDERS_PROFILE_URL: string =
  'wss://norma.nomoreparties.space/orders';

export const checkResponse = <T>(res: TResponse<T>): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function requestUrl(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export const getIngredients = () => {
  return requestUrl(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => {
    if (data?.success) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const createOrder = (ingredients: Array<string | null>) => {
  return requestUrl(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

export const resetPasswordRequest = (email: string) => {
  return requestUrl(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  });
};

export const createNewPasswordRequest = (formData: TFormData) => {
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

export const registerRequest = (userData: TUser) => {
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

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);

    return await checkResponse(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      let authToken;

      if (refreshData.accessToken.indexOf('Bearer') === 0) {
        authToken = refreshData.accessToken.split('Bearer ')[1];
      }

      if (authToken) {
        setCookie('accessToken', authToken);
      }

      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          'Bearer ' + authToken;
      }

      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
  }).then((data) => {
    if (data?.success) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const loginRequest = (form: TUserLogin) => {
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

export const updateUserRequest = ({ email, name, password }: TUserUpdate) => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({ email, name, password }),
  }).then((data) => {
    if (data?.success) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const getBurgerOrderData = (orderNumber: string) => {
  return requestUrl(`${BASE_URL}/orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
