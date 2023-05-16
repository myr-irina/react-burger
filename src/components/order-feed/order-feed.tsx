import React from 'react';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';

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
        <div className={styles.images_container}></div>
        <div className={styles.price_block}>
          <span className={`text text_type_digits-default`}>480</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
}

export default OrderFeed;
