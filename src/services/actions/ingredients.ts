import { getIngredients } from '../../utils/api-requests';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
} from '../constants/ingredients';
import { TIngredientType } from '../types/types-ingredient';
import { AppDispatch } from '../types/types-store';

export interface IIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredientType>;
}

export interface IIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsApiActions =
  | IIngredientsRequestAction
  | IIngredientsSuccessAction
  | IIngredientsFailedAction;

export function fetchIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((...data) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
