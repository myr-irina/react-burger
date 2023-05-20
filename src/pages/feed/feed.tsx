import React from 'react';
import styles from './styles.module.scss';
import OrderFeed from '../../components/order-feed/order-feed';

function Feed() {
  return (
    <main className={styles.container}>
      <section>
        <p className='text text_type_main-large mt-6'>Лента заказов</p>
        <div className={`${styles.orders_wrapper} mt-4 mb-10`}>
          <OrderFeed />
          <OrderFeed />
          <OrderFeed />
          <OrderFeed />
          <OrderFeed />
          <OrderFeed />
        </div>
      </section>
      <section className={styles.right_column}>
        <div className={`${styles.orders_board} mb-15`}>
          <ul className={styles.orders_done_list}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            <li>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>

            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
            <li className='mt-2'>
              <span
                className={`${styles.orders_ready_color} text text_type_digits-default`}
              >
                1111111
              </span>
            </li>
          </ul>
          <ul className={styles.orders_done_list}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            <li>
              <span className='text text_type_digits-default'>1111111</span>
            </li>

            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
            <li className='mt-2'>
              <span className='text text_type_digits-default'>1111111</span>
            </li>
          </ul>
        </div>

        <section>
          <p className='text text_type_main-medium'>Выполнено за все время:</p>
          <p className={`${styles.text_sh} text text_type_digits-large pb-15`}>
            222222
          </p>
        </section>
        <section>
          <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
          <p className={`${styles.text_sh} text text_type_digits-large`}>
            2222
          </p>
        </section>
      </section>
    </main>
  );
}

export default Feed;
