import { createSelector } from 'reselect';

const getBun = store => store.burgerConstructor.bun;
const getFillings = store => store.burgerConstructor.fillings;

export const getPrice = createSelector(getBun, getFillings, (bun, fillings) => {
  if (bun.length === 0) return;
  if (bun.length !== 0 || fillings.length !== 0) {
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

export const getIngredientsCount = createSelector(
  getConstructorItems,
  ({ bun, fillings }) => {
    const counters = {};

    fillings.forEach(fillings => {
      if (!counters[fillings._id]) counters[fillings._id] = 0;
      counters[fillings._id]++;
    });

    if (bun) counters[bun._id] = 2;
    return counters;
  }
);
