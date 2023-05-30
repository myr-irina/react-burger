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
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CREATE_NEW_PASSWORD_REQUEST,
  CREATE_NEW_PASSWORD_SUCCESS,
  CREATE_NEW_PASSWORD_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  AUTH_CHECK,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../constants/user';

import {
  TUser,
  TUserRegister,
  TUserLogin,
  TUserUpdate,
  TFormData,
} from '../types/types-api';
import { AppDispatch } from '../types/types-store';

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload: string;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ICreateNewPasswordRequestAction {
  readonly type: typeof CREATE_NEW_PASSWORD_REQUEST;
}

export interface ICreateNewPasswordSuccessAction {
  readonly type: typeof CREATE_NEW_PASSWORD_SUCCESS;
  readonly payload: string;
}

export interface ICreateNewPasswordFailedAction {
  readonly type: typeof CREATE_NEW_PASSWORD_FAILED;
}

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IGetAuthCheckAction {
  readonly type: typeof AUTH_CHECK;
}

export interface IUpdateInfoUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateInfoUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
}

export interface IUpdateInfoUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUserActions =
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | ICreateNewPasswordRequestAction
  | ICreateNewPasswordSuccessAction
  | ICreateNewPasswordFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IGetAuthCheckAction
  | IUpdateInfoUserRequestAction
  | IUpdateInfoUserSuccessAction
  | IUpdateInfoUserFailedAction;

export function register(userData: TUserRegister) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(userData)
      .then((res) => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('accessToken', authToken);
        }
        localStorage.setItem('refreshToken', res.refreshToken);

        if (res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}

export function login(userData: TUserLogin) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(userData)
      .then((res) => {
        let authToken;

        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }

        if (authToken) {
          setCookie('accessToken', authToken);
        }
        localStorage.setItem('refreshToken', res.refreshToken);

        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        if (res.success) {
          localStorage.clear();
          deleteCookie('accessToken');

          dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}

export function resetPassword(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(email)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: res.message,
        });
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function createNewPassword(password: TFormData) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CREATE_NEW_PASSWORD_REQUEST,
    });
    createNewPasswordRequest(password)
      .then((res) => {
        dispatch({
          type: CREATE_NEW_PASSWORD_SUCCESS,
          payload: res.message,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: CREATE_NEW_PASSWORD_FAILED,
        });
      });
  };
}
export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    dispatch(
      getUserData(() => {
        dispatch({ type: AUTH_CHECK });
      })
    );
  } else {
    dispatch({ type: AUTH_CHECK });
  }
};

export const getUserData = (afterCallback: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_FAILED,
        });
      })
      .finally(() => {
        afterCallback();
      });
  };
};

export function updateUser(user: TUserUpdate) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserRequest(user)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}
