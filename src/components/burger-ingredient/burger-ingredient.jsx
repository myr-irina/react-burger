import React from 'react';
import burgerStyles from './burger-ingredient.module.scss';
import BunImg from './../../images/crater-bun.svg';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredient(data) {
  return (
    <div className={burgerStyles.container}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={data.data.image} alt="булка" />
      <div className={burgerStyles.container__wrapper}>
        <p className={burgerStyles.container__wrapper_desc}>
          {data.data.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.data.name}</p>
    </div>
  );
}

export default BurgerIngredient;
