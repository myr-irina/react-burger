import {
  WS_CONNECT_CLOSED,
  WS_CONNECT_DISCONNECT,
  WS_CONNECT_ERROR,
  WS_CONNECT_OPEN,
  WS_CONNECT_START,
  WS_MESSAGE,
  WS_CONNECT_SUCCESS,
} from '../constants/ws-orders';

export type TWsActionTypes = {
  onStart: typeof WS_CONNECT_START;
  onOpen: typeof WS_CONNECT_OPEN;
  onSuccess: typeof WS_CONNECT_SUCCESS;
  onClose: typeof WS_CONNECT_CLOSED;
  onDisconnect: typeof WS_CONNECT_DISCONNECT;
  onError: typeof WS_CONNECT_ERROR;
  onMessage: typeof WS_MESSAGE;
};


export type TWsOrderType = {
  ingredients: Array<string>,
  _id: string,
  status: 'done' | 'created' | 'pending',
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}