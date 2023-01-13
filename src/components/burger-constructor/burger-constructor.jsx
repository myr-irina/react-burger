import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(data) {
  return (
    <div className={burgerConstructorStyles.container}>
      <ul className={burgerConstructorStyles.container__list}>
        {data.data.map((burger, index) => {
          if (index === 0) {
            return (
              <li
                key={burger._id}
                className={`${burgerConstructorStyles.element} ml-4`}
              >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={burger.name}
                  price={burger.price}
                  thumbnail={burger.image_mobile}
                />
              </li>
            );
          } else if (index === data.data.length - 1) {
            return (
              <li
                key={burger._id}
                className={`${burgerConstructorStyles.element} ml-4`}
              >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={burger.name}
                  price={burger.price}
                  thumbnail={burger.image_mobile}
                />
              </li>
            );
          } else {
            return (
              <li key={burger._id} className={burgerConstructorStyles.element}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={burger.name}
                  price={burger.price}
                  thumbnail={burger.image_mobile}
                />
              </li>
            );
          }
        })}
      </ul>
      <section className={burgerConstructorStyles.container__info}>
        <p className={burgerConstructorStyles.container__info_text}>610</p>
        <CurrencyIcon />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-10"
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
