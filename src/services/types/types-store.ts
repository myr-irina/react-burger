import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers';
import { TBurgerIngredientActions } from '../actions/burger-constructor';
import { TIngredientDetailsAction } from '../actions/ingredient-details';
import { TIngredientsApiActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';



export type RootState = ReturnType<typeof rootReducer>;

type AppActions =
  | TBurgerIngredientActions
  | TIngredientDetailsAction
  | TIngredientsApiActions
  | TOrderActions
  | TUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

export type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;

