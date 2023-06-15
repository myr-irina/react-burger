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
import { TOrderActions } from '../actions/order';
import { TWsOrderType } from '../types/types-ws-orders';

type TOrderState = {
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;

  orderDataRequest: boolean;
  orderDataFailed: boolean;
  orderData: TWsOrderType | null;
};

const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,

  orderDataRequest: false,
  orderDataFailed: false,
  orderData: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        orderFailed: false,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case ORDER_RESET: {
      return initialState;
    }

    case ORDER_DATA_REQUEST: {
      return {
        ...state,
        orderDataRequest: true,
        orderDataFailed: false,
      };
    }
    case ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderData: action.payload,
        orderDataFailed: false,
        orderDataRequest: false,
      };
    }
    case ORDER_DATA_ERROR: {
      return {
        ...state,
        orderDataFailed: true,
        orderDataRequest: false,
      };
    }
    case ORDER_DATA_RESET: {
      return {
        ...state,
        orderData: null,
      };
    }
    default: {
      return state;
    }
  }
};
