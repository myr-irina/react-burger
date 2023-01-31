import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  REORDER_BURGER_INGREDIENTS,
  RESET_BURGER_INGREDIENTS,
} from '../actions/burger-constructor';

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

    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        fillings: [
          ...state.fillings.slice(0, action.payload),
          ...state.fillings.slice(action.payload + 1),
        ],
      };
    }

    case REORDER_BURGER_INGREDIENTS: {
      const fillings = [...state.fillings];
      fillings.splice(
        action.payload.to,
        0,
        fillings.splice(action.payload.from, 1)[0]
      );

      return {
        ...state,
        fillings,
      };
    }
    case RESET_BURGER_INGREDIENTS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
