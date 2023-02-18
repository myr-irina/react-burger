import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
  EditIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileLink from '../../components/profile-link/profile-link';
import { logout, updateUser, getUserData } from '../../services/actions/user';

function Profile() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const inputRef = React.useRef(null);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, logoutSuccess } = useSelector(state => state.auth);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  const getUserFromStore = useMemo(() => {
    return {
      email: `${user ? user.email : ''}`,
      password: '',
      name: `${user ? user.name : ''}`,
    };
  }, [user]);
  console.log(getUserFromStore);

  useEffect(() => {
    if (logoutSuccess) {
      navigate('/login');
    }
  }, [logoutSuccess, navigate]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <article className={styles.container}>
      <div className={styles.left}>
        <nav className={styles.list}>
          <li>
            <ProfileLink title="Профиль" path="/profile" />
          </li>
          <li>
            <ProfileLink title="История заказов" path="/profile/orders" />
          </li>
          <li>
            <ProfileLink title="Выход" onClick={handleLogout} />
          </li>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValue(e.target.value)}
          value={getUserFromStore.name}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
          icon={'EditIcon'}
        />

        <EmailInput
          onChange={onChange}
          value={getUserFromStore.email}
          name={'email'}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={getUserFromStore.password}
          name={'password'}
          extraClass="mb-6"
        />
        <div className={styles.wrapper}>
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            extraClass="mb-30"
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-30"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </article>
  );
}

export default Profile;
