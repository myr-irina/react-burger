import { v4 as uuidv4 } from 'uuid';

import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  REORDER_BURGER_INGREDIENTS,
  RESET_BURGER_INGREDIENTS,
} from '../constants/burger-constructor';

import {
  TIngredientTypeWithId,
  TIngredientPos,
  TIngredientType,
} from '../types/types-ingredient';

export interface IAddBurgerIngredientAction {
  readonly type: typeof ADD_BURGER_INGREDIENT;
  readonly payload: TIngredientTypeWithId;
}

export interface IDeleteBurgerIngredientAction {
  readonly type: typeof DELETE_BURGER_INGREDIENT;
  readonly payload: number;
}

export interface IReorderBurgerIngredientAction {
  readonly type: typeof REORDER_BURGER_INGREDIENTS;
  readonly payload: TIngredientPos;
}

export interface IResetBurgerIngredientAction {
  readonly type: typeof RESET_BURGER_INGREDIENTS;
}

export type TSelectionIngredientActions =
  | IAddBurgerIngredientAction
  | IDeleteBurgerIngredientAction
  | IReorderBurgerIngredientAction
  | IResetBurgerIngredientAction;

export function addBurgerIngredient({
  ...ingredient
}: TIngredientType): IAddBurgerIngredientAction {
  return {
    type: ADD_BURGER_INGREDIENT,
    payload: {
      ...ingredient,
      id: uuidv4(),
    },
  };
}
