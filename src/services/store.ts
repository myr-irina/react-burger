import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';

import {
  WS_CONNECT_CLOSED,
  WS_CONNECT_START,
  WS_CONNECT_DISCONNECT,
  WS_CONNECT_ERROR,
  WS_CONNECT_OPEN,
  WS_CONNECT_SUCCESS,
  WS_MESSAGE,
} from './constants/ws-orders';

const feedActions = {
  onStart: WS_CONNECT_START,
  onOpen: WS_CONNECT_OPEN,
  onSuccess: WS_CONNECT_SUCCESS,
  onClose: WS_CONNECT_CLOSED,
  onDisconnect: WS_CONNECT_DISCONNECT,
  onError: WS_CONNECT_ERROR,
  onMessage: WS_MESSAGE,
};

const feedMiddleware = socketMiddleware({
  ...feedActions,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware);
  },
  devTools: true,
});
