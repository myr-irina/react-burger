import {
  loginRequest,
  registerRequest,
  logoutRequest,
  resetPasswordRequest,
  createNewPasswordRequest,
} from '../../utils/api-requests';
import { deleteCookie, setCookie } from '../../utils/cookies';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const CREATE_NEW_PASSWORD_REQUEST = 'CREATE_NEW_PASSWORD_REQUEST';
export const CREATE_NEW_PASSWORD_SUCCESS = 'CREATE_NEW_PASSWORD_SUCCESS';
export const CREATE_NEW_PASSWORD_FAILED = 'CREATE_NEW_PASSWORD_FAILED';

export function register(userData) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(userData)
      .then(res => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('token', authToken);
        }
        localStorage.setItem('refreshToken', res.refreshToken);

        if (res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}

export function login(userData) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(userData)
      .then(res => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('token', authToken);
        }
        localStorage.setItem('refreshToken', res.refreshToken);

        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest()
      .then(res => {
        localStorage.clear();
        deleteCookie('token');

        if (res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}

export function resetPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(email)
      .then(res => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: res.message,
        });
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function createNewPassword(password) {
  return function (dispatch) {
    dispatch({
      type: CREATE_NEW_PASSWORD_REQUEST,
    });
    createNewPasswordRequest(password)
      .then(res => {
        dispatch({
          type: CREATE_NEW_PASSWORD_SUCCESS,
          payload: res.message,
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_NEW_PASSWORD_FAILED,
        });
      });
  };
}