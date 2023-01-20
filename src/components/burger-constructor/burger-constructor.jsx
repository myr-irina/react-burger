import React, { useState } from 'react';
import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

function BurgerConstructor(props) {
  const { data } = props;
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const totalSum = data.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.element} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image_mobile}
          />
        </div>

        <ul className={styles.container__list}>
          {data.map((burger, index) => {
            return (
              <li className={`${styles.block} ml-4`} key={index}>
                <DragIcon />
                <ConstructorElement
                  text={burger.name}
                  price={burger.price}
                  thumbnail={burger.image_mobile}
                />
              </li>
            );
          })}
        </ul>
        <div className={`${styles.element} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image_mobile}
          />
        </div>

        <section className={styles.container__info}>
          <p className={styles.container__info_text}>{totalSum}</p>
          <CurrencyIcon />
          <Button
            onClick={handleOpenModal}
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="ml-10"
          >
            Оформить заказ
          </Button>
        </section>
      </div>

      {isOpen && (
        <Modal
          title={null}
          handleClose={handleCloseModal}
          children={<OrderDetails />}
        />
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructor;
