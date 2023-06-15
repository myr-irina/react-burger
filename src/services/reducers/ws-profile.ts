import {
  WS_PROFILE_CLOSED,
  WS_PROFILE_OPEN,
  WS_PROFILE_MESSAGE,
  WS_PROFILE_SUCCESS,
  WS_PROFILE_ERROR,
} from '../constants/ws-profile';

import { TWsProfileActions } from '../actions/ws-profile';
import { WebSocketStatus } from '../constants/ws-orders';
import { TWsOrderType } from '../types/types-ws-orders';

export type TProfileWS = {
  profileStatus: WebSocketStatus;
  profileOrders: Array<TWsOrderType>;
  error: string | undefined;
};

export const initialState: TProfileWS = {
  profileStatus: WebSocketStatus.OFFLINE,
  profileOrders: [],
  error: undefined,
};

export const wsProfileReducer = (
  state = initialState,
  action: TWsProfileActions
): TProfileWS => {
  switch (action.type) {
    case WS_PROFILE_OPEN:
      return {
        ...state,
        profileStatus: WebSocketStatus.ONLINE,
      };
    case WS_PROFILE_SUCCESS:
      return {
        ...state,
        error: undefined,
        profileStatus: WebSocketStatus.CONNECTING,
        profileOrders: [],
      };
    case WS_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        profileStatus: WebSocketStatus.OFFLINE,
      };
    case WS_PROFILE_CLOSED:
      return {
        ...state,
        error: undefined,
        profileStatus: WebSocketStatus.OFFLINE,
        profileOrders: [],
      };
    case WS_PROFILE_MESSAGE:
      return {
        ...state,
        error: undefined,
        profileOrders: [...action.payload.orders],
      };
    default:
      return state;
  }
};
