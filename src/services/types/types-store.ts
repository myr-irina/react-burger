import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { rootReducer } from '../reducers';
import { IIngredientDetailsAction } from '../actions/ingredient-details';

export type TRootState = ReturnType<typeof rootReducer>;

type TApplicationActions = IIngredientDetailsAction;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, TRootState, Action, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;
