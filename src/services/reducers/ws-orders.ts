import {
  WS_CONNECT_CLOSED,
  WS_CONNECT_ERROR,
  WS_CONNECT_OPEN,
  WS_CONNECT_SUCCESS,
  WS_MESSAGE,
} from '../constants/ws-orders';

import { TActions } from '../actions/ws-orders';
import { WebSocketStatus } from '../constants/ws-orders';
import { TWsOrderType } from '../types/types-ingredient';

export type TOrdersWS = {
  status: WebSocketStatus;
  orders: Array<TWsOrderType>;
  total: number | null;
  totalToday: number | null;
  connectingError: string;
};

export const initialState: TOrdersWS = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  total: null,
  totalToday: null,
  connectingError: '',
};

export const WSOrderReducer = (
  state = initialState,
  action: TActions
): TOrdersWS => {
  switch (action.type) {
    case WS_CONNECT_OPEN:
      return {
        ...state,
        status: WebSocketStatus.ONLINE,
      };
    case WS_CONNECT_SUCCESS:
      return {
        ...state,
        status: WebSocketStatus.CONNECTING,
        orders: [],
        connectingError: '',
      };
    case WS_CONNECT_ERROR:
      return {
        ...state,
        connectingError: action.payload,
        status: WebSocketStatus.OFFLINE,
      };
    case WS_CONNECT_CLOSED:
      return {
        ...state,
        connectingError: '',
        status: WebSocketStatus.OFFLINE,
        orders: [],
      };
    case WS_MESSAGE:
      return {
        ...state,
        connectingError: '',
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
