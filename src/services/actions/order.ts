import { createOrder, getBurgerOrderData } from '../../utils/api-requests';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET,
  ORDER_DATA_ERROR,
  ORDER_DATA_REQUEST,
  ORDER_DATA_RESET,
  ORDER_DATA_SUCCESS,
} from '../constants/order';
import { AppDispatch } from '../types/types-store';
import { TWsOrderType } from '../types/types-ws-orders';

export interface IOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: number;
}

export interface IOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IOrderResetAction {
  readonly type: typeof ORDER_RESET;
}

export interface IOrderDataRequestAction {
  readonly type: typeof ORDER_DATA_REQUEST;
}
export interface IOrderDataSuccessAction {
  readonly type: typeof ORDER_DATA_SUCCESS;
  readonly payload: TWsOrderType;
}
export interface IOrderDataErrorAction {
  readonly type: typeof ORDER_DATA_ERROR;
}

export interface IOrderDataResetAction {
  readonly type: typeof ORDER_DATA_RESET;
}

export type TOrderActions =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderFailedAction
  | IOrderResetAction
  | IOrderDataRequestAction
  | IOrderDataSuccessAction
  | IOrderDataErrorAction
  | IOrderDataResetAction;

export function createOrderId(ids: Array<string | null>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrder(ids)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: data.order.number,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export const getBurgerOrder =
  (orderNumber: string | undefined) => (dispatch: AppDispatch) => {
    dispatch({
      type: ORDER_DATA_REQUEST,
    });
    getBurgerOrderData(orderNumber)
      .then((result) => {
        if (result && result.success) {
          dispatch({
            type: ORDER_DATA_SUCCESS,
            payload: result.orders[0],
          });
        } else {
          dispatch({
            type: ORDER_DATA_ERROR,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ORDER_DATA_ERROR,
        });
      });
  };
