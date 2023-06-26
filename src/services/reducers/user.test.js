import { expect } from '@jest/globals';
import { authReducer, initialState } from './user';
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

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should handle REGISTER_REQUEST', () => {
    const state = {
      ...initialState,
      registerRequest: true,
    };
    expect(authReducer(initialState, { type: REGISTER_REQUEST })).toEqual(
      state,
    );
  });

  it('should should handle REGISTER_SUCCESS', () => {
    const userInfo = {
      email: 'email@mail.com',
      name: 'test',
    };

    const state = {
      ...initialState,
      user: userInfo,
      registerRequest: false,
      registerSuccess: true,
      isAuthChecked: true,
    };

    expect(
      authReducer(initialState, { type: REGISTER_SUCCESS, payload: userInfo }),
    ).toEqual(state);
  });

  it('should handle REGISTER_FAILED', () => {
    const state = {
      ...initialState,
      registerFailed: true,
      registerRequest: false,
      isAuthChecked: false,
    };

    expect(authReducer(initialState, { type: REGISTER_FAILED })).toEqual(state);
  });

  it('should handle LOGIN_REQUEST', () => {
    const state = {
      ...initialState,
      loginRequest: true,
      logoutSuccess: false,
    };

    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual(state);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const userInfo = {
      email: 'email@mail.com',
      name: 'test',
    };

    const state = {
      ...initialState,
      loginRequest: false,
      loginSuccess: true,

      user: userInfo,
      isAuthChecked: true,
    };

    expect(
      authReducer(initialState, { type: LOGIN_SUCCESS, payload: userInfo }),
    ).toEqual(state);
  });

  it('should handle LOGIN_FAILED', () => {
    const state = {
      ...initialState,
      loginFailed: true,
      loginRequest: false,
    };

    expect(authReducer(initialState, { type: LOGIN_FAILED })).toEqual(state);
  });

  it('should handle LOGOUT_REQUEST', () => {
    const state = {
      ...initialState,
      logoutRequest: true,
    };

    expect(authReducer(initialState, { type: LOGOUT_REQUEST })).toEqual(state);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const state = {
      ...initialState,
      logoutRequest: false,
      logoutSuccess: true,
      loginSuccess: false,

      user: null,
    };

    expect(authReducer(initialState, { type: LOGOUT_SUCCESS })).toEqual(state);
  });

  it('should handle LOGOUT_FAILED', () => {
    const state = {
      ...initialState,
      logoutFailed: true,
      logoutRequest: false,
    };

    expect(authReducer(initialState, { type: LOGOUT_FAILED })).toEqual(state);
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    const state = {
      ...initialState,
      resetPasswordRequest: true,
    };

    expect(authReducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual(
      state,
    );
  });

  it('should handle  RESET_PASSWORD_SUCCESS', () => {
    const psw = '123';
    const state = {
      ...initialState,
      passwordStatus: psw,
      resetPasswordRequest: false,
      resetPasswordSuccess: true,
      resetPasswordFailed: false,
    };

    expect(
      authReducer(initialState, { type: RESET_PASSWORD_SUCCESS, payload: psw }),
    ).toEqual(state);
  });

  it('should handle  RESET_PASSWORD_FAILED', () => {
    const state = {
      ...initialState,
      passwordStatus: null,
      resetPasswordFailed: true,
      resetPasswordRequest: false,
    };

    expect(authReducer(initialState, { type: RESET_PASSWORD_FAILED })).toEqual(
      state,
    );
  });

  it('should handle CREATE_NEW_PASSWORD_REQUEST', () => {
    const state = {
      ...initialState,
      newPasswordRequest: true,
      newPasswordFailed: false,
    };

    expect(
      authReducer(initialState, { type: CREATE_NEW_PASSWORD_REQUEST }),
    ).toEqual(state);
  });

  it('should handle CREATE_NEW_PASSWORD_SUCCESS', () => {
    const psw = '123';
    const state = {
      ...initialState,
      newPassword: psw,
      newPasswordRequest: false,
      newPasswordSuccess: true,
      newPasswordFailed: false,
    };

    expect(
      authReducer(initialState, {
        type: CREATE_NEW_PASSWORD_SUCCESS,
        payload: psw,
      }),
    ).toEqual(state);
  });

  it('should handle CREATE_NEW_PASSWORD_FAILED', () => {
    const state = {
      ...initialState,
      newPassword: null,
      newPasswordFailed: true,
      newPasswordRequest: false,
    };

    expect(
      authReducer(initialState, {
        type: CREATE_NEW_PASSWORD_FAILED,
      }),
    ).toEqual(state);
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    const state = {
      ...initialState,
      updateUserRequest: true,
      updateUserFailed: false,
    };

    expect(
      authReducer(initialState, {
        type: UPDATE_USER_REQUEST,
      }),
    ).toEqual(state);
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const userInfo = {
      email: 'email@mail.com',
      name: 'test',
    };

    const state = {
      ...initialState,
      user: userInfo,
      updateUserRequest: false,
      updateUserSuccess: true,
      updateUserFailed: false,
    };

    expect(
      authReducer(initialState, {
        type: UPDATE_USER_SUCCESS,
        payload: userInfo,
      }),
    ).toEqual(state);
  });

  it('should handle UPDATE_USER_FAILED', () => {
    const state = {
      ...initialState,
      updateUserRequest: false,
      updateUserFailed: true,
    };

    expect(
      authReducer(initialState, {
        type: UPDATE_USER_FAILED,
      }),
    ).toEqual(state);
  });

  it('should handle GET_USER_REQUEST', () => {
    const state = {
      ...initialState,
      getUserRequest: true,
      getUserFailed: false,
    };

    expect(
      authReducer(initialState, {
        type: GET_USER_REQUEST,
      }),
    ).toEqual(state);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const userInfo = {
      email: 'email@mail.com',
      name: 'test',
    };
    const state = {
      ...initialState,
      user: userInfo,
      getUserRequest: false,
      getUserSuccess: true,
      updateUserFailed: false,
    };

    expect(
      authReducer(initialState, {
        type: GET_USER_SUCCESS,
        payload: userInfo,
      }),
    ).toEqual(state);
  });

  it('should handle GET_USER_FAILED', () => {
    const state = {
      ...initialState,
      getUserRequest: false,
      getUserFailed: true,
    };

    expect(
      authReducer(initialState, {
        type: GET_USER_FAILED,
      }),
    ).toEqual(state);
  });

  it('should handle AUTH_CHECK', () => {
    const state = {
      ...initialState,
      isAuthChecked: true,
    };

    expect(
      authReducer(initialState, {
        type: AUTH_CHECK,
      }),
    ).toEqual(state);
  });
});
