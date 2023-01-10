import React from 'react';
import burgersStyles from './burger-ingredients.module.scss';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Tabs from '../tabs/tabs';

function BurgerIngredients({ data }) {
  return (
    <main className={burgersStyles.container}>
      <h2 className={burgersStyles.container__header}>Соберите бургер</h2>
      <Tabs />
      <div className={burgersStyles.container__list}>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={burgersStyles.container__main}>
            {data
              .filter(data => data.type === 'bun')
              .map(filteredburger => {
                return (
                  <li key={filteredburger._id}>
                    <BurgerIngredient data={filteredburger} />
                  </li>
                );
              })}
          </div>
        </section>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={burgersStyles.container__main}>
            {data
              .filter(data => data.type === 'sauce')
              .map(filteredburger => {
                return (
                  <li key={filteredburger._id}>
                    <BurgerIngredient data={filteredburger} />
                  </li>
                );
              })}
          </div>
        </section>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Основное</h2>
          <div className={burgersStyles.container__main}>
            {data
              .filter(data => data.type === 'main')
              .map(filteredburger => {
                return (
                  <li key={filteredburger._id}>
                    <BurgerIngredient data={filteredburger} />
                  </li>
                );
              })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default BurgerIngredients;
