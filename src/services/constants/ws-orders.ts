export enum WebSocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export const WS_CONNECT_START: 'WS_CONNECT_START' = 'WS_CONNECT_START';
export const WS_CONNECT_OPEN: 'WS_CONNECT_OPEN' = 'WS_CONNECT_OPEN';

export const WS_CONNECT_SUCCESS: 'WS_CONNECT_SUCCESS' = 'WS_CONNECT_SUCCESS';
export const WS_CONNECT_CLOSED: 'WS_CONNECT_CLOSED' = 'WS_CONNECT_CLOSED';

export const WS_CONNECT_DISCONNECT: 'WS_CONNECT_DISCONNECT' =
  'WS_CONNECT_DISCONNECT';
export const WS_CONNECT_ERROR: 'WS_CONNECT_ERROR' = 'WS_CONNECT_ERROR';

export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';

export const QTY_TO_SHOW = 10;
