import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { rootReducer } from '../reducers';
import { TBurgerIngredientActions } from '../actions/burger-constructor';
import { TIngredientDetailsAction } from '../actions/ingredient-details';
import { TIngredientsApiActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';

import { store } from '../store';

export type TRootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TBurgerIngredientActions
  | TIngredientDetailsAction
  | TIngredientsApiActions
  | TOrderActions
  | TUserActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, TRootState, Action, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<
  TRootState,
  unknown,
  TApplicationActions
>;
