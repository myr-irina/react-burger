import {
  WS_PROFILE_CLOSED,
  WS_PROFILE_ERROR,
  WS_PROFILE_MESSAGE,
  WS_PROFILE_OPEN,
  WS_PROFILE_START,
  WS_PROFILE_SUCCESS,
  WS_PROFILE_DISCONNECT,
} from '../constants/ws-profile';
import { TWsOrderType } from '../types/types-ws-orders';

export interface IProfileMessage {
  orders: TWsOrderType[];
}

export interface IProfileConnectAction {
  readonly type: typeof WS_PROFILE_START;
  payload: string;
}
export interface IProfileOpenAction {
  readonly type: typeof WS_PROFILE_OPEN;
}
export interface IProfileSuccessAction {
  readonly type: typeof WS_PROFILE_SUCCESS;
}
export interface IProfileClosedAction {
  readonly type: typeof WS_PROFILE_CLOSED;
}
export interface IProfileDisconnectAction {
  readonly type: typeof WS_PROFILE_DISCONNECT;
}
export interface IProfileErrorAction {
  readonly type: typeof WS_PROFILE_ERROR;
  payload: string | undefined;
}
export interface IProfilMessageAction {
  readonly type: typeof WS_PROFILE_MESSAGE;
  payload: IProfileMessage;
}

export type TWsProfileActions =
  | IProfileConnectAction
  | IProfileOpenAction
  | IProfileSuccessAction
  | IProfileClosedAction
  | IProfileDisconnectAction
  | IProfileErrorAction
  | IProfilMessageAction;

export const wsProfileStart = (url: string): IProfileConnectAction => {
  return {
    type: WS_PROFILE_START,
    payload: url,
  };
};

export const wsProfileOpen = (): IProfileOpenAction => {
  return {
    type: WS_PROFILE_OPEN,
  };
};

export const wsProfileSuccess = (): IProfileSuccessAction => {
  return {
    type: WS_PROFILE_SUCCESS,
  };
};

export const wsProfileClosed = (): IProfileClosedAction => {
  return {
    type: WS_PROFILE_CLOSED,
  };
};

export const wsProfileDisconnect = (): IProfileDisconnectAction => {
  return {
    type: WS_PROFILE_DISCONNECT,
  };
};

export const wsProfileError = (error: string): IProfileErrorAction => {
  return {
    type: WS_PROFILE_ERROR,
    payload: error,
  };
};

export const wsProfileMessage = (message: any): IProfilMessageAction => {
  return {
    type: WS_PROFILE_MESSAGE,
    payload: message,
  };
};
