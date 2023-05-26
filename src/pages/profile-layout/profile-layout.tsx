import React, { useEffect, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import ProfileLink from '../../components/profile-link/profile-link';
import { logout } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

function ProfileLayout() {
  const dispatch = useDispatch();

  const { logoutSuccess } = useSelector((state) => state.auth);

  function handleLogout(e: SyntheticEvent<Element, Event>) {
    e.preventDefault();
    dispatch(logout());
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutSuccess) {
      navigate('/login');
    }
  }, [logoutSuccess, navigate]);

  return (
    <article className={styles.wrapper}>
      <div>
        <nav className={styles.list}>
          <li style={{ paddingBottom: '40px' }}>
            <ProfileLink title='Профиль' path='/profile' />
          </li>
          <li style={{ paddingBottom: '40px' }}>
            <ProfileLink title='История заказов' path='/profile/orders' />
          </li>
          <li>
            <ProfileLink title='Выход' onClick={handleLogout} />
          </li>
        </nav>
        <p className='text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </article>
  );
}

export default ProfileLayout;
