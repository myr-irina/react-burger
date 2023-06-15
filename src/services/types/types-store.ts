import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers';
import { TBurgerIngredientActions } from '../actions/burger-constructor';
import { TIngredientDetailsAction } from '../actions/ingredient-details';
import { TIngredientsApiActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/ws-orders';
import { TWsProfileActionTypes } from './types-ws-profile';
import { TWsFeedActionTypes } from './types-ws-orders';
import { TWsProfileActions } from '../actions/ws-profile';

export type TWsActionTypes = TWsFeedActionTypes | TWsProfileActionTypes;

export type RootState = ReturnType<typeof rootReducer>;

type AppActions =
  | TBurgerIngredientActions
  | TIngredientDetailsAction
  | TIngredientsApiActions
  | TOrderActions
  | TUserActions
  | TWSActions
  | TWsProfileActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

export type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;
