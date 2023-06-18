import { ingredientsReducer, initialState } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants/ingredients';
import { expect } from '@jest/globals';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const state = {
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST }),
    ).toEqual(state);
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const state = {
      ...initialState,
      ingredients: [],
      ingredientsFailed: false,
      ingredientsRequest: false,
    };
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: [],
      }),
    ).toEqual(state);
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const state = {
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED }),
    ).toEqual(state);
  });
});
