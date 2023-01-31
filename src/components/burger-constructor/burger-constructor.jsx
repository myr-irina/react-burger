import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { fetchIngredients } from '../services/actions/ingredients';
import { createOrderId, ORDER_RESET } from '../services/actions/order';
import { addBurgerIngredient } from '../services/actions/burger-constructor';
import { RESET_BURGER_INGREDIENTS } from '../services/actions/burger-constructor';
import IngredientBox from '../ingredient-box/ingredient-box';

function BurgerConstructor() {
  const { order } = useSelector(store => store.order);
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
    dispatch({ type: ORDER_RESET });
    dispatch({ type: RESET_BURGER_INGREDIENTS });
    setIsOpen(false);
  }

  const ids = useMemo(() => {
    return [
      bun._id,
      ...fillings.map(item => {
        return item._id;
      }),
    ];
  }, [fillings, bun]);

  const totalSum = useMemo(() => {
    if (bun.length === 0) return;
    if (bun.length !== 0 || fillings.length !== 0) {
      let bunSum = 0;
      if (bun) {
        bunSum += bun.price * 2;
      }

      const fillingsSum = fillings.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);

      return bunSum + fillingsSum;
    }
  }, [bun, fillings]);

  function sendOrder() {
    dispatch(createOrderId(ids));
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'fillingsItem',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addBurgerIngredient(item));
    },
  });

  const receivedOrderId = useMemo(() => {
    return order ? order.order.number : 0;
  }, [order]);

  return (
    <>
      <div className={styles.container} ref={dropTarget}>
        {bun.length === 0 && fillings.length === 0 ? (
          <div className={styles.empty_field}>
            <p className="text text_type_main-default">
              Переместите сюда выбранную Вами булочку
            </p>
            <p className="text text_type_main-default">
              А затем начинки и соусы.
            </p>
          </div>
        ) : null}

        {bun.length !== 0 && (
          <div className={`${styles.element} ml-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        )}

        {fillings.length !== 0 && (
          <ul className={styles.container__list}>
            {fillings.map((element, index) => {
              return (
                <IngredientBox
                  element={element}
                  index={index}
                  key={element.id}
                />
              );
            })}
          </ul>
        )}
        {bun.length !== 0 && (
          <div className={`${styles.element} ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        )}

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
            disabled={bun.length === 0}
          >
            Оформить заказ
          </Button>
        </section>
      </div>

      {isOpen && (
        <Modal
          title={null}
          handleClose={handleCloseModal}
          children={<OrderDetails order={receivedOrderId} />}
        />
      )}
    </>
  );
}

export default BurgerConstructor;
