import React from 'react';
import burgersStyles from './burger-ingredients.module.scss';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Tabs from '../tabs/tabs';

function BurgerIngredients() {
  return (
    <main className={burgersStyles.container}>
      <h2 className={burgersStyles.container__header}>Соберите бургер</h2>
      <Tabs />
      <div className={burgersStyles.container__list}>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={burgersStyles.container__main}>
            <BurgerIngredient />
            <BurgerIngredient />
          </div>
        </section>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={burgersStyles.container__main}>
            <BurgerIngredient />
            <BurgerIngredient />
          </div>
        </section>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={burgersStyles.container__main}>
            <BurgerIngredient />
            <BurgerIngredient />
          </div>
        </section>
        <section className={`${burgersStyles.container__section} mt-10`}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={burgersStyles.container__main}>
            <BurgerIngredient />
            <BurgerIngredient />
          </div>
        </section>
      </div>
    </main>
  );
}

export default BurgerIngredients;
