import {
  loginRequest,
  registerRequest,
  logoutRequest,
  resetPasswordRequest,
  createNewPasswordRequest,
  updateUserRequest,
  getUser,
} from '../../utils/api-requests';
import { deleteCookie, setCookie, getCookie } from '../../utils/cookies';

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

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST ';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const AUTH_CHECK = 'AUTH_CHECK';

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
        if (res.success) {
          localStorage.clear();
          deleteCookie('token');

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
export const checkUserAuth = () => dispatch => {
  if (getCookie('token')) {
    dispatch(
      getUserData(() => {
        dispatch({ type: AUTH_CHECK });
      })
    );
  } else {
    dispatch({ type: AUTH_CHECK });
  }
};

export function getUserData() {
  return function (dispatch) {
    console.log('get user action');
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then(res => {
        console.log('get user success action', res);
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch(err => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

// export const getUserData = afterCallback => dispatch => {
//   console.log('get user action');
//   dispatch({
//     type: GET_USER_REQUEST,
//   });
//   getUser()
//     .then(res => {
//       console.log('get user success action', res);
//       dispatch({
//         type: GET_USER_SUCCESS,
//         payload: res.user,
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_USER_FAILED,
//         payload: err.message,
//       });
//     })
//     .finally(() => {
//       afterCallback();
//     });
// };

export function updateUser(user) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserRequest(user)
      .then(res => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch(error => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}
