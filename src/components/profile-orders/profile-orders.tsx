import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { getCookie } from '../../utils/cookies';
import { profileOrders } from '../../services/selectors/ws-selectors';
import {
  wsProfileClosed,
  wsProfileStart,
} from '../../services/actions/ws-profile';
import { WS_ORDERS_PROFILE_URL } from '../../utils/api-requests';
import OrderCard from '../order-card/order-card';
import Preloader from '../preloader/preloader';

function ProfileOrders() {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  const privateOrders = useSelector(profileOrders);

  useEffect(() => {
    dispatch(wsProfileStart(`${WS_ORDERS_PROFILE_URL}?token=${accessToken}`));

    return () => {
      dispatch(wsProfileClosed());
    };
  }, [dispatch, accessToken]);

  console.log({ accessToken, privateOrders });

  if (!privateOrders) return <Preloader />;

  return (
    <>
      {privateOrders.map((order, index) => {
        return <OrderCard order={order} key={index} isProfile={true} />;
      })}
    </>
  );
}

export default ProfileOrders;
