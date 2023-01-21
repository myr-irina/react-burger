import React, { useState, useEffect, useContext, useMemo } from 'react';
import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { IngredientsContext, OrderContext } from '../services/appContext';
import { createOrder } from '../../utils/constants';

function BurgerConstructor() {
  const { ingredients } = useContext(IngredientsContext);
  const { order, setOrder } = useContext(OrderContext);

  const [isOpen, setIsOpen] = useState(false);

  function sendOrder() {
    createOrder(ids)
      .then(res => setOrder(res.order.number))
      .catch(err =>
        alert(`Во время создания заказа произошла ошибка ${err.message}`)
      );
  }

  useEffect(() => {
    sendOrder();
  }, []);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const ids = useMemo(
    () =>
      ingredients.map(item => {
        return item._id;
      }),
    [ingredients]
  );

  const bun = useMemo(
    () => ingredients.filter(item => item.type === 'bun'),
    [ingredients]
  );

  const bunIngredients = useMemo(
    () => ingredients.filter(item => item.type !== 'bun'),
    [ingredients]
  );

  const sum = useMemo(
    () =>
      bunIngredients.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0),
    [bunIngredients]
  );
  const totalSum = sum + bun[0].price * 2;

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.element} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun[0].name} (верх)`}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image_mobile}
          />
        </div>

        <ul className={styles.container__list}>
          {bunIngredients.map((element, index) => {
            return (
              <li className={`${styles.block} ml-4`} key={index}>
                <DragIcon />
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image_mobile}
                />
              </li>
            );
          })}
        </ul>
        <div className={`${styles.element} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun[0].name} (низ)`}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image_mobile}
          />
        </div>

        <section className={styles.container__info}>
          <p className={styles.container__info_text}>{totalSum}</p>
          <CurrencyIcon />
          <Button
            onClick={() => {
              sendOrder();
              handleOpenModal();
            }}
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
          children={<OrderDetails order={order} />}
        />
      )}
    </>
  );
}

export default BurgerConstructor;
