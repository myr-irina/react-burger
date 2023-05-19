import React from 'react';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import BurgerIcon from '../../images/burger-small-icon.svg';
import cn from 'classnames';

function OrderFeed() {
  const dateFromServer = '2022-10-10T17:33:32.877Z';

  return (
    <section className={styles.wrapper}>
      <div className={styles.order_info}>
        <div className={styles.order_number}>
          <p className='text text_type_digits-default'>#31</p>
        </div>
        <div>
          <FormattedDate
            date={new Date(dateFromServer)}
            className='text text_type_main-default text_color_inactive'
          />
        </div>
      </div>
      <p className={`${styles.order_name} text text_type_main-medium`}>
        Death Star Starship бургер
      </p>

      <div className={styles.content}>
        <div className={styles.images_container}>
          <img
            className={styles.circular_image}
            src={BurgerIcon}
            alt='изображение ингредиента'
          />
          <img
            className={styles.circular_image}
            src={BurgerIcon}
            alt='изображение ингредиента'
          />
          <img
            className={styles.circular_image}
            src={BurgerIcon}
            alt='изображение ингредиента'
          />
          <img
            className={styles.circular_image}
            src={BurgerIcon}
            alt='изображение ингредиента'
          />

          <div className={styles.hidden_images}>
            <div className={styles.centered_text}>+10</div>
            <img
              // className={styles.hidden_images}
              src={BurgerIcon}
              alt='изображение ингредиента'
            />
          </div>
        </div>
        <div className={styles.price_block}>
          <span className={`text text_type_digits-default`}>480</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
}

export default OrderFeed;
