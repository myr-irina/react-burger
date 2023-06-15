import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { useSelector } from '../../services/hooks';
import { ingredients } from '../../services/selectors/burger-constructor';
import { TWsOrderType } from '../../services/types/types-ws-orders';
import { TIngredientType } from '../../services/types/types-ingredient';

type TOrderCardProps = {
  readonly order: TWsOrderType;
  readonly isProfile: boolean;
};

function OrderCard({ order, isProfile }: TOrderCardProps) {
  const location = useLocation();

  const maxIngredients = 6;

  const ingredientsList = useSelector(ingredients);

  const orderStatus = useMemo(
    () =>
      order.status === 'done'
        ? 'Выполнен'
        : order.status === 'created'
        ? 'Создан'
        : 'Готовится',
    [order.status]
  );

  const statusColor = useMemo(
    () =>
      order.status === 'done' ? styles.status_done : styles.status_default,
    [order.status]
  );

  const orderInfo = useMemo(() => {
    if (!ingredientsList.length) return;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientType[], item) => {
        const ingredient = ingredientsList.find((elem) => elem._id === item);

        if (ingredient) acc.push(ingredient);
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : null;

    const date = order.createdAt;

    return {
      ...order,
      ingredientsInfo,
      total,
      ingredientsToShow,
      remains,
      date,
    };
  }, [ingredientsList, order]);

  if (!orderInfo) return null;

  return (
    <Link
      to={`${location.pathname}/${orderInfo.number}`}
      state={{ background: location }}
      className={styles.wrapper}
    >
      <div className={styles.order_info}>
        <div className={styles.order_number}>
          <p className='text text_type_digits-default'>{orderInfo.number}</p>
        </div>
        <div>
          <FormattedDate
            date={new Date(orderInfo.date)}
            className='text text_type_main-default text_color_inactive'
          />
        </div>
      </div>
      <p className={`${styles.order_name} text text_type_main-medium`}>
        {orderInfo.name}
      </p>
      {isProfile && orderStatus && (
        <p
          className={`${styles.status_order} ${statusColor} text text_type_main-default`}
        >
          {orderStatus}
        </p>
      )}

      <div className={styles.content}>
        <div className={styles.images_container}>
          {orderInfo.ingredientsToShow.map((ingredinet, index) => {
            let zIndex = maxIngredients - index;
            let right = 20 * index;
            return (
              <li
                className={styles.image_row}
                style={{ zIndex: zIndex, right: right }}
                key={index}
              >
                <img
                  style={{
                    opacity:
                      orderInfo.remains && maxIngredients === index + 1
                        ? '0.5'
                        : '1',
                  }}
                  src={ingredinet.image_mobile}
                  alt={ingredinet.name}
                />
                {maxIngredients === index + 1 ? (
                  <span
                    className={`${styles.remains} text text_type_main-default`}
                  >
                    {orderInfo.remains && `+${orderInfo?.remains}`}
                  </span>
                ) : null}
              </li>
            );
          })}
        </div>

        <div className={styles.price_block}>
          <span className={`text text_type_digits-default`}>
            {orderInfo.total}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
