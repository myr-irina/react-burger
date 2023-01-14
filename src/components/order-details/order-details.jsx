import React from 'react';
import Modal from '../modal/modal';
import styles from './styles.module.scss';

function OrderDetails({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <>
        <p className={`${'text text_type_digits-large'} mt-30 mb-8`}>123456</p>
        <p className={`${'text text_type_main-medium'} mb-15`}>
          идентификатор заказа
        </p>
        <div className={styles.order_icon}></div>
        <p className={`${'text text_type_main-small'} mb-2`}>
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </>
    </Modal>
  );
}

export default OrderDetails;
