import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import OrderFeed from '../../components/order-card/order-card';
import { useDispatch, useSelector } from '../../services/hooks';
import {
  connectionStart,
  connectionClosed,
} from '../../services/actions/ws-orders';
import { WS_ORDERS_ALL } from '../../utils/api-requests';
import { feed, total, totalToday } from '../../services/selectors/ws-selectors';
import Preloader from '../../components/preloader/preloader';
import { QTY_TO_SHOW } from '../../services/constants/ws-orders';
import OrderCard from '../../components/order-card/order-card';

function Feed() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(connectionStart(WS_ORDERS_ALL));

    return () => {
      dispatch(connectionClosed());
    };
  }, [dispatch]);

  const feedOrders = useSelector(feed);
  const totalOrders = useSelector(total);
  const totalTodayOrders = useSelector(totalToday);

  const doneOrderNumbers = useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === 'done')
        .map((elem) => elem.number),
    [feedOrders]
  );

  const pendingOrdersNumbers = useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === 'pending')
        .map((elem) => elem.number),
    [feedOrders]
  );

  if (!feedOrders) {
    return <Preloader />;
  }

  const ordersToShow = doneOrderNumbers.slice(0, QTY_TO_SHOW);
  const ordersToShowMore = doneOrderNumbers.slice(QTY_TO_SHOW, QTY_TO_SHOW * 2);
  const ordersPendingToShow = pendingOrdersNumbers.slice(0, QTY_TO_SHOW);
  const ordersPendingToShowMore = pendingOrdersNumbers.slice(
    QTY_TO_SHOW,
    QTY_TO_SHOW * 2
  );

  return (
    <main className={styles.container}>
      <section>
        <p className='text text_type_main-large mt-6'>Лента заказов</p>
        <div className={`${styles.orders_wrapper} mt-4 mb-10`}>
          {feedOrders &&
            feedOrders.map((order, index) => (
              <OrderCard key={index} order={order} isProfile={false} />
            ))}
        </div>
      </section>
      <section className={styles.right_column}>
        <div className={styles.orders_board}>
          <p className='text text_type_main-medium mb-6'>Готовы:</p>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
        </div>

        <div className={`${styles.orders_board} mb-15`}>
          <div className={styles.orders_board_wrapper}>
            <ul className={styles.orders_done_list}>
              {ordersToShow.map((number) => (
                <li key={number} className={styles.orders_ready_color}>
                  <Link to={`${number}`} state={{ background: location }}>
                    <span className='text text_type_digits-default'>
                      {number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={styles.orders_done_list}>
              {ordersToShowMore.map((number) => (
                <li key={number} className={styles.orders_ready_color}>
                  <Link to={`${number}`} state={{ background: location }}>
                    <span className='text text_type_digits-default'>
                      {number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.orders_board_wrapper}>
            <ul className={styles.orders_done_list}>
              {ordersPendingToShow.map((number) => (
                <li key={number} className='mt-2'>
                  <Link to={`${number}`} state={{ background: location }}>
                    <span className='text text_type_digits-default'>
                      {number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={styles.orders_done_list}>
              {ordersPendingToShowMore.map((number) => (
                <li key={number} className='mt-2'>
                  <Link to={`${number}`} state={{ background: location }}>
                    <span className='text text_type_digits-default'>
                      {number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section>
          <p className='text text_type_main-medium'>Выполнено за все время:</p>
          <p className={`${styles.text_sh} text text_type_digits-large pb-15`}>
            {totalOrders}
          </p>
        </section>
        <section>
          <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
          <p className={`${styles.text_sh} text text_type_digits-large`}>
            {totalTodayOrders}
          </p>
        </section>
      </section>
    </main>
  );
}

export default Feed;
