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

    default: {
      return state;
    }
  }
};
