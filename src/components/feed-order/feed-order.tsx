import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './styles.module.scss';
import { getBurgerOrder } from '../../services/actions/order';
import { ORDER_DATA_RESET } from '../../services/constants/order';
import { orderDetails } from '../../services/selectors/burger-constructor';

function FeedOrder() {
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    dispatch(getBurgerOrder(id));

    return () => {
      dispatch({ type: ORDER_DATA_RESET });
    };
  });

  const orderInfo = useSelector(orderDetails);

  console.log({ orderInfo });

  return <main className={styles.container}></main>;
}

export default FeedOrder;
