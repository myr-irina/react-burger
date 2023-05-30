import { createSelector } from 'reselect';
import { RootState } from '../types/types-store';
import { TIngredientType } from '../types/types-ingredient';

export const getBun = (store: RootState) => store.burgerConstructor.bun;
export const getFillings = (store: RootState) =>
  store.burgerConstructor.fillings;

export const getPrice = createSelector(getBun, getFillings, (bun, fillings) => {
  if (!bun) return;
  if (bun !== null || fillings !== null) {
    return (
      (bun ? bun.price * 2 : 0) +
      fillings.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0)
    );
  }
});

export const getConstructorItems = createSelector(
  getBun,
  getFillings,
  (bun, fillings) => ({ bun, fillings })
);

interface ICounter {
  [key: string]: number;
}
export const getIngredientsCount = createSelector(
  getConstructorItems,
  ({ bun, fillings }) => {
    const counters: ICounter = {};

    fillings.forEach((fillings: TIngredientType) => {
      if (!counters[fillings._id]) counters[fillings._id] = 0;
      counters[fillings._id]++;
    });

    if (bun) counters[bun._id] = 2;
    return counters;
  }
);
