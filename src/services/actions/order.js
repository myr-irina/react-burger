import { createOrder } from '../../utils/api-requests';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const ORDER_RESET = 'ORDER_RESET';

export function createOrderId(ids) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrder(ids)
      .then(data => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
