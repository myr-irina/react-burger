import { ADD_BURGER_INGREDIENT } from '../actions/burger-constructor';

const initialState = {
  bun: [],
  fillings: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      }

      return {
        ...state,
        fillings: [...state.fillings, action.payload],
      };
    }

    default:
      return state;
  }
};
