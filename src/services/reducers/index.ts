import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { ingredientDetailsReducer } from './ingredient-details';
import { authReducer } from './user';
import { wsOrderReducer } from './ws-orders';
import { wsProfileReducer } from './ws-profile';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  wsFeed: wsOrderReducer,
  wsProfile: wsProfileReducer
});
