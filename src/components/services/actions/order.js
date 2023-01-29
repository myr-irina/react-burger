import { createOrder } from '../../../utils/api-requests';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function fetchOrderId() {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrder()
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
