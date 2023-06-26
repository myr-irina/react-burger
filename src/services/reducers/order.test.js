import { expect } from '@jest/globals';
import { orderReducer, initialState } from './order';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET,
  ORDER_DATA_ERROR,
  ORDER_DATA_REQUEST,
  ORDER_DATA_RESET,
  ORDER_DATA_SUCCESS,
} from '../constants/order';

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    };
    expect(orderReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual(
      state,
    );
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    const orderNumber = 100;
    const state = {
      ...initialState,
      order: orderNumber,
      orderFailed: false,
      orderRequest: false,
    };
    expect(
      orderReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        payload: orderNumber,
      }),
    ).toEqual(state);
  });

  it('should handle GET_ORDER_FAILED', () => {
    const state = {
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    };
    expect(orderReducer(initialState, { type: GET_ORDER_FAILED })).toEqual(
      state,
    );
  });

  it('should handle ORDER_RESET', () => {
    const state = {
      ...initialState,
      order: null,
      orderFailed: false,
      orderRequest: false,
    };
    expect(orderReducer(initialState, { type: ORDER_RESET })).toEqual(state);
  });

  it('should handle ORDER_DATA_REQUEST', () => {
    const state = {
      ...initialState,
      orderDataRequest: true,
      orderDataFailed: false,
    };
    expect(orderReducer(initialState, { type: ORDER_DATA_REQUEST })).toEqual(
      state,
    );
  });

  it('should handle ORDER_DATA_SUCCESS', () => {
    const orderData = {
      ingredients: [],
      _id: '',
      status: 'done',
      number: 0,
      createdAt: '',
      updatedAt: '',
      name: '',
    };
    const state = {
      ...initialState,
      orderData: orderData,
      orderDataFailed: false,
      orderDataRequest: false,
    };
    expect(
      orderReducer(initialState, {
        type: ORDER_DATA_SUCCESS,
        payload: orderData,
      }),
    ).toEqual(state);
  });

  it('should handle ORDER_DATA_ERROR', () => {
    const state = {
      ...initialState,
      orderDataFailed: true,
      orderDataRequest: false,
    };
    expect(orderReducer(initialState, { type: ORDER_DATA_ERROR })).toEqual(
      state,
    );
  });

  it('should handle ORDER_DATA_RESET', () => {
    const state = {
      ...initialState,
      orderData: null,
      orderDataFailed: false,
      orderDataRequest: false,
    };
    expect(orderReducer(initialState, { type: ORDER_DATA_RESET })).toEqual(
      state,
    );
  });
});
