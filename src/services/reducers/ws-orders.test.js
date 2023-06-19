import { expect } from '@jest/globals';
import {
  WS_CONNECT_CLOSED,
  WS_CONNECT_ERROR,
  WS_CONNECT_OPEN,
  WS_CONNECT_SUCCESS,
  WS_MESSAGE,
} from '../constants/ws-orders';
import { WebSocketStatus } from '../constants/ws-orders';
import { wsOrderReducer, initialState } from './ws-orders';

describe('ws order reducer', () => {
  it('should return the initial state', () => {
    expect(wsOrderReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should handle WS_CONNECT_OPEN', () => {
    const state = {
      ...initialState,
      status: WebSocketStatus.ONLINE,
    };
    expect(wsOrderReducer(initialState, { type: WS_CONNECT_OPEN })).toEqual(
      state,
    );
  });

  it('should handle WS_CONNECT_SUCCESS', () => {
    const state = {
      ...initialState,
      status: WebSocketStatus.CONNECTING,
      orders: [],
      connectingError: '',
    };
    expect(wsOrderReducer(initialState, { type: WS_CONNECT_SUCCESS })).toEqual(
      state,
    );
  });

  it('should handle WS_CONNECT_ERROR', () => {
    const errorMessage = 'error';
    const state = {
      ...initialState,
      connectingError: errorMessage,
      status: WebSocketStatus.OFFLINE,
    };
    expect(
      wsOrderReducer(initialState, {
        type: WS_CONNECT_ERROR,
        payload: errorMessage,
      }),
    ).toEqual(state);
  });

  it('should handle WS_CONNECT_CLOSED', () => {
    const state = {
      ...initialState,
      connectingError: '',
      status: WebSocketStatus.OFFLINE,
      orders: [],
    };
    expect(
      wsOrderReducer(initialState, {
        type: WS_CONNECT_CLOSED,
      }),
    ).toEqual(state);
  });

  it('should handle WS_MESSAGE', () => {
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
      total: 100,
      totalToday: 10,
    };

    const state = {
      ...initialState,
      connectingError: '',
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
      total: 100,
      totalToday: 10,
    };

    expect(
      wsOrderReducer(initialState, {
        type: WS_MESSAGE,
        payload: order,
      }),
    ).toEqual(state);
  });
});
