import { ingredientDetailsReducer, initialState } from './ingredient-details';
import { expect } from '@jest/globals';
import {
  SET_INGREDIENT_DATA,
  RESET_INGREDIENT_DATA,
} from '../constants/ingredient-details';

describe('check ingredient-details reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: null })).toEqual(
      initialState
    );
  });

  it('should handle SET_INGREDIENT_DATA action', () => {
    const ingredientData = {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_mobile: '',
      image_large: '',
      __v: 0,
    };
    const state = {
      ...initialState,
      ingredientData: ingredientData,
    };

    expect(
      ingredientDetailsReducer(initialState, {
        type: SET_INGREDIENT_DATA,
        payload: ingredientData,
      })
    ).toEqual(state);
  });

  it('should handle RESET_INGREDIENT_DATA', () => {
    const state = {
      initialState,
    };
    expect(
      ingredientDetailsReducer(initialState, { type: RESET_INGREDIENT_DATA })
    ).toEqual(state);
  });
});
