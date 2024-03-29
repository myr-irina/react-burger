import {
  REGISTER_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
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
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  AUTH_CHECK,
} from '../constants/user';

import { TUser } from '../types/types-api';
import { TUserActions } from '../actions/user';

type TUserState = {
  user: TUser | null;

  isAuthChecked: boolean;

  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;

  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;

  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: boolean;

  passwordStatus: string | null;
  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;

  newPassword: string | null;
  newPasswordRequest: boolean;
  newPasswordSuccess: boolean;
  newPasswordFailed: boolean;

  getUserRequest: boolean;
  getUserSuccess: boolean;
  getUserFailed: boolean;

  updateUserRequest: boolean;
  updateUserSuccess: boolean;
  updateUserFailed: boolean;
};

export const initialState: TUserState = {
  user: null,

  isAuthChecked: false,

  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,

  passwordStatus: null,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,

  newPassword: null,
  newPasswordRequest: false,
  newPasswordSuccess: false,
  newPasswordFailed: false,

  getUserRequest: false,
  getUserSuccess: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserSuccess: false,
  updateUserFailed: false,
};

export const authReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerSuccess: true,

        user: action.payload,
        isAuthChecked: true,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,

        isAuthChecked: false,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        logoutSuccess: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,

        user: action.payload,
        isAuthChecked: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: true,
        loginSuccess: false,

        user: null,
      };
    }
    case LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordStatus: action.payload,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        passwordStatus: null,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      };
    }

    case CREATE_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        newPasswordRequest: true,
        newPasswordFailed: false,
      };
    }
    case CREATE_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        newPassword: action.payload,
        newPasswordRequest: false,
        newPasswordSuccess: true,
        newPasswordFailed: false,
      };
    }
    case CREATE_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        newPassword: null,
        newPasswordFailed: true,
        newPasswordRequest: false,
      };
    }
    case AUTH_CHECK: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
        getUserSuccess: true,
        updateUserFailed: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        updateUserRequest: false,
        updateUserSuccess: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
