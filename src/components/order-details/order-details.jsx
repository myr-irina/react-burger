import React from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

function OrderDetails({ order }) {
  return (
    <>
      <p className={`${'text text_type_digits-large'} mt-30 mb-8`}>{order}</p>
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
  );
}
// OrderDetails.propTypes = {
//   order: PropTypes.number.isRequired,
// };

export default OrderDetails;
