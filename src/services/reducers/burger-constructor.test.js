import { expect } from '@jest/globals';
import { burgerConstructorReducer, initialState } from './burger-constructor';
import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  REORDER_BURGER_INGREDIENTS,
  RESET_BURGER_INGREDIENTS,
} from '../constants/burger-constructor';

const mockedIngredient = {
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
  id: '',
};

const mockedFillings1 = {
  _id: '1',
  name: 'sauce 1',
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
  id: '1',
};

const mockedFillings2 = {
  _id: '2',
  name: 'sauce 2',
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
  id: '2',
};

describe('burgerConstructorReducer reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: null })).toEqual(
      initialState,
    );
  });

  it('should handle ADD_BURGER_INGREDIENT', () => {
    const state = {
      ...initialState,
      fillings: [...initialState.fillings, mockedIngredient],
    };

    expect(
      burgerConstructorReducer(initialState, {
        type: ADD_BURGER_INGREDIENT,
        payload: mockedIngredient,
      }),
    ).toEqual(state);
  });

  it('should handle DELETE_BURGER_INGREDIENT', () => {
    const newInitialState = {
      ...initialState,
      fillings: [mockedFillings1],
    };
    const state = {
      ...initialState,
      fillings: [],
    };

    expect(
      burgerConstructorReducer(newInitialState, {
        type: DELETE_BURGER_INGREDIENT,
        payload: 0,
      }),
    ).toEqual(state);
  });

  it('should handle REORDER_BURGER_INGREDIENTS', () => {
    const newInitialState = {
      ...initialState,
      fillings: [mockedFillings1, mockedFillings2],
    };

    const state = {
      ...initialState,
      fillings: [mockedFillings2, mockedFillings1],
    };
    expect(
      burgerConstructorReducer(newInitialState, {
        type: REORDER_BURGER_INGREDIENTS,
        payload: { to: 1, from: 0 },
      }),
    ).toEqual(state);
  });

  it('should handle RESET_BURGER_INGREDIENTS', () => {
    const state = {
      ...initialState,
    };
    expect(
      burgerConstructorReducer(initialState, {
        type: RESET_BURGER_INGREDIENTS,
      }),
    ).toEqual(state);
  });
});
