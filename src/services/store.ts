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

import {
  WS_PROFILE_START,
  WS_PROFILE_OPEN,
  WS_PROFILE_SUCCESS,
  WS_PROFILE_CLOSED,
  WS_PROFILE_DISCONNECT,
  WS_PROFILE_ERROR,
  WS_PROFILE_MESSAGE,
} from './constants/ws-profile';

const feedActions = {
  onStart: WS_CONNECT_START,
  onOpen: WS_CONNECT_OPEN,
  onSuccess: WS_CONNECT_SUCCESS,
  onClose: WS_CONNECT_CLOSED,
  onDisconnect: WS_CONNECT_DISCONNECT,
  onError: WS_CONNECT_ERROR,
  onMessage: WS_MESSAGE,
};

const profileActions = {
  onStart: WS_PROFILE_START,
  onOpen: WS_PROFILE_OPEN,
  onSuccess: WS_PROFILE_SUCCESS,
  onClose: WS_PROFILE_CLOSED,
  onDisconnect: WS_PROFILE_DISCONNECT,
  onError: WS_PROFILE_ERROR,
  onMessage: WS_PROFILE_MESSAGE,
};

const feedMiddleware = socketMiddleware({
  ...feedActions,
});

const profileMiddleware = socketMiddleware({
  ...profileActions,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, profileMiddleware);
  },
  devTools: true,
});
