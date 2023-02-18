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
} from '../actions/user';

const initialState = {
  user: null,
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

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerRequest: false,
        registerSuccess: true,
        registerFailed: false,
      };
    }
    case REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginRequest: false,
        loginSuccess: true,
        loginFailed: false,
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
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
        user: null,
        logoutRequest: false,
        logoutSuccess: true,
        logoutFailed: false,
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
