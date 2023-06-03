import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { ingredientDetailsReducer } from './ingredient-details';
import { authReducer } from './user';
import { WSOrderReducer } from './ws-orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  wsFeed: WSOrderReducer,
});
