import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../types/types-store';
import { TWsActionTypes } from '../types/types-store';
import { refreshToken } from '../../utils/api-requests';

export const socketMiddleware = (
  wsActions: TWsActionTypes
): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = '';
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const {
        onStart,
        onOpen,
        onSuccess,
        onClose,
        onDisconnect,
        onError,
        onMessage,
      } = wsActions;

      if (type === onStart) {
        url = payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch({ type: onSuccess });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: 'Connection error' });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (
            !parsedData?.success &&
            parsedData?.message === 'Token is invalid'
          ) {
            refreshToken();
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch({ type: onClose });
            socket?.close();
          }

          if (isConnected) {
            dispatch({ type: onSuccess });
            reconnectTimer = window.setTimeout(() => {
              dispatch({
                type: onStart,
                payload: url,
              });
            }, 3000);
          }
        };

        if (type === onDisconnect) {
          isConnected = false;
          socket.close();
          dispatch({ type: onClose });
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
