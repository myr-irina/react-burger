import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './styles.module.scss';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TWsOrderType } from '../../services/types/types-ws-orders';
import { getBurgerOrderData } from '../../utils/api-requests';
import { useSelector } from '../../services/hooks';
import { ingredients } from '../../services/selectors/burger-constructor';

type TIngredientCount = {
  [key: string]: number;
};

function FeedOrderDetails() {
  const dateFromServer = '2022-10-10T17:33:32.877Z';

  const { id } = useParams();

  const [order, setOrder] = useState<TWsOrderType | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    getBurgerOrderData(id).then((data) => setOrder(data.orders[0]));
  }, [id]);

  const allIngredients = useSelector(ingredients);
  const ingredientsData = allIngredients.filter((ingredient) =>
    order?.ingredients.includes(ingredient._id)
  );

  const ingredientsCounts: TIngredientCount = {};

  order?.ingredients?.forEach((id) => {
    ingredientsCounts[id] = (ingredientsCounts[id] || 0) + 1;
  });

  const orderPrice = ingredientsData.reduce((acc, curr) => {
    return acc + curr.price * ingredientsCounts[curr._id];
  }, 0);

  if (!order) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.order_info}>
        <p className='text text_type_digits-default'>{order?.number}</p>
      </div>
      <p
        className={`${styles.order_name} text text_type_main-medium mb-3 mt-10`}
      >
        {order?.name}
      </p>
      <p className={`text text_type_main-default mb-15 ${styles.status_order}`}>
        {order?.status === 'done' ? (
          <span>Выполнен</span>
        ) : (
          <span>В работе</span>
        )}
      </p>
      <div className={styles.content}>
        <p className='text text_type_main-medium mb-6'>{'Состав:'}</p>
        <ul className={styles.images_container}>
          {ingredientsData.map((ingredient) => {
            return (
              <li className={styles.ingredient_info} key={ingredient._id}>
                <img
                  className={styles.circular_image}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <p className={`text text_type_main-default ${styles.desc}`}>
                    {ingredient.name}
                  </p>
                  <div className={styles.price_calc}>
                    <span className='text text_type_digits-default mr-2'>
                      {ingredientsCounts[ingredient._id]} X {ingredient.price}
                    </span>
                    <CurrencyIcon type='primary' />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.price_block}>
          <div>
            <FormattedDate
              date={new Date(dateFromServer)}
              className='text text_type_main-default text_color_inactive'
            />
          </div>
          <div className={styles.price_block_wrapper}>
            <span className='text text_type_digits-default mr-2'>
              {orderPrice}
            </span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedOrderDetails;
