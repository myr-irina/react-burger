import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { createOrderId } from '../../services/actions/order';
import { ORDER_RESET } from '../../services/constants/order';
import { RESET_BURGER_INGREDIENTS } from '../../services/constants/burger-constructor';
import { addBurgerIngredient } from '../../services/actions/burger-constructor';
import IngredientBox from '../ingredient-box/ingredient-box';
import {
  getPrice,
  getBun,
  getFillings,
} from '../../services/selectors/burger-constructor';
import {
  TIngredientType,
  TIngredientTypeWithId,
} from '../../services/types/types-ingredient';

type TDropCollectedPropTypes = {
  isHover: boolean;
};

function BurgerConstructor() {
  const [isOpen, setIsOpen] = useState(false);
  const bun = useSelector(getBun);
  const fillings = useSelector(getFillings);
  const totalPrice = useSelector(getPrice);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      bun && bun._id,
      ...fillings.map((item: { _id: string }) => {
        return item._id;
      }),
    ];
  }, [fillings, bun]);

  function sendOrder() {
    dispatch(createOrderId(ids));
  }

  const handleClick = () => {
    if (user) {
      sendOrder();
      handleOpenModal();
    } else {
      navigate('/login');
    }
  };

  const [, dropTarget] = useDrop<
    TIngredientType,
    unknown,
    TDropCollectedPropTypes
  >({
    accept: 'fillingsItem',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addBurgerIngredient(item));
    },
  });

  return (
    <>
      <div className={styles.container} ref={dropTarget}>
        {bun && fillings.length === 0 ? (
          <div className={styles.empty_field}>
            <p className='text text_type_main-default'>
              Переместите сюда выбранную Вами булочку
            </p>
            <p className='text text_type_main-default'>
              А затем начинки и соусы.
            </p>
          </div>
        ) : null}

        {bun && (
          <div className={`${styles.element} ml-8`}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        )}

        {fillings.length !== 0 && (
          <ul className={styles.container__list}>
            {fillings.map((element, index: number) => {
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
        {bun && (
          <div className={`${styles.element} ml-8`}>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        )}

        <section className={styles.container__info}>
          <p className={styles.container__info_text}>{totalPrice}</p>
          <CurrencyIcon type={'secondary'} />
          <Button
            onClick={handleClick}
            htmlType='button'
            type='primary'
            size='medium'
            extraClass='ml-10'
            disabled={!bun}
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

export default BurgerConstructor;
