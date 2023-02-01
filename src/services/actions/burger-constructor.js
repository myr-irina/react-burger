import { v4 as uuidv4 } from 'uuid';

export const ADD_BURGER_INGREDIENT = 'ADD_BURGER_INGREDIENT';
export const DELETE_BURGER_INGREDIENT = 'DELETE_BURGER_INGREDIENT';
export const REORDER_BURGER_INGREDIENTS = 'REORDER_BURGER_INGREDIENTS';
export const RESET_BURGER_INGREDIENTS = 'RESET_BURGER_INGREDIENTS';

export function addBurgerIngredient(ingredient) {
  return {
    type: ADD_BURGER_INGREDIENT,
    payload: {
      ...ingredient.ingredientData,
      id: uuidv4(),
    },
  };
}
