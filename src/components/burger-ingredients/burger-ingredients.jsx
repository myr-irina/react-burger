import React from 'react';
import burgersStyles from './burger-ingredients.module.scss';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

function BurgerIngredients() {
  return (
    <main className={burgersStyles.container}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <section className={burgersStyles.container__section}>
        <h2 className="text text_type_main-default">Бургеры</h2>
        <div className={burgersStyles.container__main}>
          <BurgerIngredient />
          <BurgerIngredient />
        </div>
      </section>
    </main>
  );
}

export default BurgerIngredients;
