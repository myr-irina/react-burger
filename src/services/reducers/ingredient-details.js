import {
  SET_INGREDIENT_DATA,
  RESET_INGREDIENT_DATA,
} from '../actions/ingredient-details';

const initialState = {
  ingredientData: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: action.payload,
      };
    }

    case RESET_INGREDIENT_DATA: {
      return {
        initialState,
      };
    }

    default:
      return state;
  }
};
