import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Preloader from '../preloader/preloader';

function OrderDetails() {
  const { order, orderRequest, orderFailed } = useSelector(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (state) => state.order
  );

  if (orderFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  }

  return (
    <>
      {orderRequest ? (
        <Preloader />
      ) : (
        <>
          <p className={`${'text text_type_digits-large'} mt-30 mb-8`}>
            {order.order.number}
          </p>
          <p className={`${'text text_type_main-medium'} mb-15`}>
            идентификатор заказа
          </p>
          <div className={styles.order_icon}></div>
          <p className={`${'text text_type_main-small'} mb-2`}>
            Ваш заказ начали готовить
          </p>
          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </>
  );
}

export default OrderDetails;
