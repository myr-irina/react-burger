import React from 'react';
import burgerStyles from './burger-ingredient.module.scss';
import BunImg from './../../images/crater-bun.svg';

function BurgerIngredient() {
  return (
    <div className={burgerStyles.container}>
      <img src={BunImg} alt="bun" />
    </div>
  );
}

export default BurgerIngredient;
