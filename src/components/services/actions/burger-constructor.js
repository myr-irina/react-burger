import { v4 as uuidv4 } from 'uuid';

export const ADD_BURGER_INGREDIENT = 'ADD_BURGER_INGREDIENT';

export function addBurgerIngredient() {
  return {
    type: ADD_BURGER_INGREDIENT,
    id: uuidv4(),
  };
}
