import {
  WS_CONNECT_CLOSED,
  WS_CONNECT_DISCONNECT,
  WS_CONNECT_ERROR,
  WS_CONNECT_OPEN,
  WS_CONNECT_START,
  WS_CONNECT_SUCCESS,
  WS_MESSAGE,
} from '../constants/ws-orders';

import { TWsOrderType } from '../types/types-ingredient';

export interface IMessage {
  orders: TWsOrderType[];
  total: number | null;
  totalToday: number | null;
}

export interface IConnectStartAction {
  readonly type: typeof WS_CONNECT_START;
  payload: string;
}
export interface IConnectOpenAction {
  readonly type: typeof WS_CONNECT_OPEN;
}
export interface IConnectSuccessAction {
  readonly type: typeof WS_CONNECT_SUCCESS;
}
export interface IConnectClosedAction {
  readonly type: typeof WS_CONNECT_CLOSED;
}
export interface IConnectDisconnectAction {
  readonly type: typeof WS_CONNECT_DISCONNECT;
}
export interface IConnectErrorAction {
  readonly type: typeof WS_CONNECT_ERROR;
  payload: string;
}

export interface IMessageAction {
  readonly type: typeof WS_MESSAGE;
  payload: IMessage;
}

export type TWSActions =
  | IConnectStartAction
  | IConnectOpenAction
  | IConnectSuccessAction
  | IConnectClosedAction
  | IConnectDisconnectAction
  | IConnectErrorAction
  | IMessageAction;

export const connectionStart = (url: string): IConnectStartAction => ({
  type: WS_CONNECT_START,
  payload: url,
});

export const connectionOpen = (): IConnectOpenAction => {
  return {
    type: WS_CONNECT_OPEN,
  };
};

export const connectionSuccess = (): IConnectSuccessAction => {
  return {
    type: WS_CONNECT_SUCCESS,
  };
};

export const connectionClosed = (): IConnectClosedAction => {
  return {
    type: WS_CONNECT_CLOSED,
  };
};

export const connectionDisconnect = (): IConnectDisconnectAction => {
  return {
    type: WS_CONNECT_DISCONNECT,
  };
};

export const connectionError = (error: string): IConnectErrorAction => {
  return {
    type: WS_CONNECT_ERROR,
    payload: error,
  };
};

export const message = (message: any): IMessageAction => {
  return {
    type: WS_MESSAGE,
    payload: message,
  };
};
