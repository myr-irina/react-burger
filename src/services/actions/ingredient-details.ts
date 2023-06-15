import {
  SET_INGREDIENT_DATA,
  RESET_INGREDIENT_DATA,
} from '../constants/ingredient-details';

import { TIngredientType } from '../types/types-ingredient';

export interface ISetIngredientDataAction {
  readonly type: typeof SET_INGREDIENT_DATA;
  payload: TIngredientType;
}

export interface IResetIngredientDataAction {
  readonly type: typeof RESET_INGREDIENT_DATA;
}

export type TIngredientDetailsAction =
  | ISetIngredientDataAction
  | IResetIngredientDataAction;
