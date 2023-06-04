import {
  WS_PROFILE_CLOSED,
  WS_PROFILE_ERROR,
  WS_PROFILE_MESSAGE,
  WS_PROFILE_OPEN,
  WS_PROFILE_START,
  WS_PROFILE_SUCCESS,
  WS_PROFILE_DISCONNECT,
} from '../constants/ws-profile';

export type TWsProfileActionTypes = {
  onStart: typeof WS_PROFILE_START;
  onOpen: typeof WS_PROFILE_OPEN;
  onSuccess: typeof WS_PROFILE_SUCCESS;
  onClose: typeof WS_PROFILE_CLOSED;
  onDisconnect: typeof WS_PROFILE_DISCONNECT;
  onError: typeof WS_PROFILE_ERROR;
  onMessage: typeof WS_PROFILE_MESSAGE;
};
