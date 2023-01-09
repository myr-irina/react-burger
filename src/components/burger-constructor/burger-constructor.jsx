import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BunImg from './../../images/crater-bun.svg';

function BurgerConstructor() {
  return (
    <div className={burgerConstructorStyles.container}>
      <div
        className={burgerConstructorStyles.container__list}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <div className={burgerConstructorStyles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={BunImg}
          />
        </div>
        <div className={burgerConstructorStyles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={BunImg}
          />
        </div>
        <div className={burgerConstructorStyles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={BunImg}
          />
        </div>
        <div className={burgerConstructorStyles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={BunImg}
          />
        </div>
        <div className={burgerConstructorStyles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={BunImg}
          />
        </div>
        <div className={burgerConstructorStyles.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={BunImg}
          />
        </div>
      </div>
      <section className={burgerConstructorStyles.container__info}>
        <p className="text text_type_digits-medium">1234567890</p>
        {/* <p className={burgerStyles.container__wrapper_desc}>20</p> */}
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          // extraClass="ml-2"
        >
          Оформить заказ
        </Button>
      </section>
    </div>
  );
}

export default BurgerConstructor;
