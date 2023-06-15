import {
  SET_INGREDIENT_DATA,
  RESET_INGREDIENT_DATA,
} from '../constants/ingredient-details';

import { TIngredientDetailsAction } from '../actions/ingredient-details';
import { TIngredientType } from '../types/types-ingredient';

type TIngredientDetailsState = {
  ingredientData: TIngredientType | null;
};

const initialState: TIngredientDetailsState = {
  ingredientData: null,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsAction
) => {
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
    default: {
      return state;
    }
  }
};
