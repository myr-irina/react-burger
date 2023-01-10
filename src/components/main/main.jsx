import React from 'react';
import mainStyles from './main.module.scss';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main({ data }) {
  return (
    <main className={mainStyles.container}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}

export default Main;
