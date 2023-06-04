import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { getCookie } from '../../utils/cookies';
import { profileOrders } from '../../services/selectors/ws-selectors';
import {
  wsProfileClosed,
  wsProfileStart,
} from '../../services/actions/ws-profile';
import { WS_ORDERS_PROFILE_URL } from '../../utils/api-requests';

function ProfileOrders() {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  const privateOrders = useSelector(profileOrders);
  console.log({ accessToken, privateOrders });

  useEffect(() => {
    dispatch(wsProfileStart(`${WS_ORDERS_PROFILE_URL}?token=${accessToken}`));

    return () => {
      dispatch(wsProfileClosed);
    };
  }, [dispatch, accessToken]);

  return <div>ProfileOrders</div>;
}

export default ProfileOrders;
