import React from 'react';
import styles from './styles.module.scss';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIcon from '../../images/burger-small-icon.svg';

function FeedOrderDetails() {
  const dateFromServer = '2022-10-10T17:33:32.877Z';

  return (
    <section className={styles.wrapper}>
      <div className={styles.order_info}>
        <p className='text text_type_digits-default'>#31</p>
      </div>
      <p
        className={`${styles.order_name} text text_type_main-medium mb-3 mt-10`}
      >
        Death Star Starship бургер
      </p>
      <p className={`text text_type_main-default mb-15 ${styles.status_order}`}>
        Выполнен
      </p>
      <div className={styles.content}>
        <p className='text text_type_main-medium mb-6'>{'Состав:'}</p>
        <ul className={styles.images_container}>
          <li className={styles.ingredient_info}>
            <img
              className={styles.circular_image}
              src={BurgerIcon}
              alt='изображение ингредиента'
            />
            <p className={`text text_type_main-default ${styles.desc}`}>
              Филе Люминесцентного тетраодонтимформа
            </p>
            <div className={styles.price_calc}>
              <span className='text text_type_digits-default mr-2'>{`${1} x ${20}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
          <li className={styles.ingredient_info}>
            <img
              className={styles.circular_image}
              src={BurgerIcon}
              alt='изображение ингредиента'
            />
            <p className={`text text_type_main-default ${styles.desc}`}>
              Филе Люминесцентного тетраодонтимформа
            </p>
            <div className={styles.price_calc}>
              <span className='text text_type_digits-default mr-2'>{`${1} x ${20}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
          <li className={styles.ingredient_info}>
            <img
              className={styles.circular_image}
              src={BurgerIcon}
              alt='изображение ингредиента'
            />
            <p className={`text text_type_main-default ${styles.desc}`}>
              Филе Люминесцентного тетраодонтимформа
            </p>
            <div className={styles.price_calc}>
              <span className='text text_type_digits-default mr-2'>{`${1} x ${20}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
          <li className={styles.ingredient_info}>
            <img
              className={styles.circular_image}
              src={BurgerIcon}
              alt='изображение ингредиента'
            />
            <p className={`text text_type_main-default ${styles.desc}`}>
              Филе Люминесцентного тетраодонтимформа
            </p>
            <div className={styles.price_calc}>
              <span className='text text_type_digits-default mr-2'>{`${1} x ${20}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
          <li className={styles.ingredient_info}>
            <img
              className={styles.circular_image}
              src={BurgerIcon}
              alt='изображение ингредиента'
            />
            <p className={`text text_type_main-default ${styles.desc}`}>
              Филе Люминесцентного тетраодонтимформа
            </p>
            <div className={styles.price_calc}>
              <span className='text text_type_digits-default mr-2'>{`${1} x ${20}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        </ul>
        <div className={styles.price_block}>
          <div>
            <FormattedDate
              date={new Date(dateFromServer)}
              className='text text_type_main-default text_color_inactive'
            />
          </div>
          <div className={styles.price_block_wrapper}>
            <span className='text text_type_digits-default mr-2'>480</span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedOrderDetails;
