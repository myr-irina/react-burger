import { createOrder } from '../../utils/api-requests';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET,
} from '../constants/order';
import { AppDispatch } from '../types/types-store';

export interface IOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
}

export interface IOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IOrderResetAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderFailedAction
  | IOrderResetAction;

export function createOrderId(ids: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrder(ids)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
