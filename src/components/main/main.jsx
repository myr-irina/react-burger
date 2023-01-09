import React from 'react';
import mainStyles from './main.module.scss';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main() {
  return (
    <main className={mainStyles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
