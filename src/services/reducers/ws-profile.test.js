import { expect } from '@jest/globals';
import {
  WS_PROFILE_CLOSED,
  WS_PROFILE_OPEN,
  WS_PROFILE_MESSAGE,
  WS_PROFILE_SUCCESS,
  WS_PROFILE_ERROR,
} from '../constants/ws-profile';
import { WebSocketStatus } from '../constants/ws-orders';
import { wsProfileReducer, initialState } from './ws-profile';

describe('ws profile reducer', () => {
  it('should return the initial state', () => {
    expect(wsProfileReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should handle WS_PROFILE_OPEN', () => {
    const state = {
      ...initialState,
      profileStatus: WebSocketStatus.ONLINE,
    };

    expect(wsProfileReducer(initialState, { type: WS_PROFILE_OPEN })).toEqual(
      state,
    );
  });

  it('should handle WS_PROFILE_SUCCESS', () => {
    const state = {
      ...initialState,
      error: undefined,
      profileStatus: WebSocketStatus.CONNECTING,
      profileOrders: [],
    };

    expect(
      wsProfileReducer(initialState, { type: WS_PROFILE_SUCCESS }),
    ).toEqual(state);
  });

  it('should handle WS_PROFILE_ERROR', () => {
    const errorMessage = 'error';
    const state = {
      ...initialState,
      error: errorMessage,
      profileStatus: WebSocketStatus.OFFLINE,
    };

    expect(
      wsProfileReducer(initialState, {
        type: WS_PROFILE_ERROR,
        payload: errorMessage,
      }),
    ).toEqual(state);
  });

  it('should handle WS_PROFILE_CLOSED', () => {
    const state = {
      ...initialState,
      error: undefined,
      profileStatus: WebSocketStatus.OFFLINE,
      profileOrders: [],
    };

    expect(
      wsProfileReducer(initialState, {
        type: WS_PROFILE_CLOSED,
      }),
    ).toEqual(state);
  });

  it('should handle WS_PROFILE_MESSAGE', () => {
    const order = {
      orders: [
        {
          ingredients: ['bun', 'sauce', 'bun2'],
          _id: '1',
          status: 'done',
          number: 1,
          createdAt: '',
          updatedAt: '',
          name: 'Бургер',
        },
      ],
    };
    const state = {
      ...initialState,
      error: undefined,
      profileOrders: [
        {
          ingredients: ['bun', 'sauce', 'bun2'],
          _id: '1',
          status: 'done',
          number: 1,
          createdAt: '',
          updatedAt: '',
          name: 'Бургер',
        },
      ],
    };

    expect(
      wsProfileReducer(initialState, {
        type: WS_PROFILE_MESSAGE,
        payload: order,
      }),
    ).toEqual(state);
  });
});
