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
      if (action.payload.ingredientData.type === 'bun') {
        return {
          ...state,
          bun: action.payload.ingredientData,
        };
      }

      return {
        ...state,
        fillings: [...state.fillings, action.payload.ingredientData],
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
      return {
        ...state,
        fillings: state.fillings.splice(
          action.payload.to,
          0,
          state.fillings.splice(action.payload.from, 1)[0]
        ),
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
