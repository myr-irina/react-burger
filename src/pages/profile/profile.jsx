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
  const { user, logoutSuccess } = useSelector(state => state.auth);

  const [form, setValue] = useState({
    name: user.name,
    email: user.email,
    password: '******',
  });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function saveChanges(e) {
    e.preventDefault();

    const updateFields = { name: form.name, email: form.email };

    if (form.password && form.password.indexOf('*') < 0) {
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutSuccess) {
      navigate('/login');
    }
  }, [logoutSuccess, navigate]);

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
          onChange={onChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
          icon={'EditIcon'}
        />

        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
          icon={'EditIcon'}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass="mb-6"
          icon={'EditIcon'}
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
