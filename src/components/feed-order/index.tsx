import React from 'react';
import styles from './styles.module.scss';
import OrderFeed from '../order-feed/order-feed';

function FeedOrder() {
  return (
    <main className={styles.container}>
      <OrderFeed />
      <OrderFeed />
      <OrderFeed />
      <OrderFeed />
      <OrderFeed />
      <OrderFeed />
    </main>
  );
}

export default FeedOrder;
