import React from 'react';
import styles from './styles.module.scss';
import OrderFeed from '../../components/order-feed/order-feed';

function Feed() {
  return (
    <main className={styles.container}>
      <section className={styles.left_column}>
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
      <section className={styles.right_column}></section>
    </main>
  );
}

export default Feed;
