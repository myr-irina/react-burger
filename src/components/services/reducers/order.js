import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET,
} from '../actions/order';

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        orderFailed: false,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case ORDER_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
