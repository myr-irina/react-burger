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
        socket.onopen = (event) => {
          dispatch({ type: onSuccess });
        };
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: 'Connection error' });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (
            !parsedData?.success &&
            parsedData?.message === 'Invalid or missing token'
          ) {
            refreshToken();
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
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
