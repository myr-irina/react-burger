import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { fetchIngredients } from '../services/actions/ingredients';
import { fetchOrderId } from '../services/actions/order';

function BurgerConstructor() {
  const order = useSelector(store => store.order);
  const [isOpen, setIsOpen] = useState(false);
  const { bun, fillings } = useSelector(store => store.burgerConstructor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const ids = useMemo(
    () => [
      bun._id,
      ...fillings.map(item => {
        return item._id;
      }),
    ],
    [fillings, bun]
  );

  const totalSum = useMemo(() => {
    let bunSum = 0;
    if (bun) {
      bunSum += bun.price * 2;
    }

    const fillingsSum = fillings.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    return bunSum + fillingsSum;
  }, [bun, fillings]);

  function sendOrder() {
    dispatch(fetchOrderId(ids));
  }

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.element} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
        <ul className={styles.container__list}>
          {fillings.map((element, index) => {
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
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
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
