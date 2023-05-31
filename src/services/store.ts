import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// const wsActions = {
//   onStart: WS_CONNECTION_START,
//   onOpen: WS_CONNECTION_OPEN,
//   onSuccess: WS_CONNECTION_SUCCESS,
//   onClosed: WS_CONNECTION_CLOSED,
//   onDisconnect: WS_CONNECTION_DISCONNECT,
//   onError: WS_CONNECTION_ERROR,
//   onMessage: WS_GET_MESSAGE
// };

// export const store = configureStore(
//   rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware()
//   },
//   devTools: true
// );
