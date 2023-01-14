import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
  const { data, onOpen } = props;

  const totalSum = data.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return (
    <div className={burgerConstructorStyles.container}>
      <ul className={burgerConstructorStyles.container__list}>
        {data.map((burger, index) => {
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
          } else if (index === data.length - 1) {
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
        <p className={burgerConstructorStyles.container__info_text}>
          {totalSum}
        </p>
        <CurrencyIcon />
        <Button
          onClick={onOpen}
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

// BurgerConstructor.propTypes = {
//   data: PropTypes.array.isRequired,
// };

export default BurgerConstructor;
