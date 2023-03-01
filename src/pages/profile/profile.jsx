import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileLink from '../../components/profile-link/profile-link';
import { logout, updateUser } from '../../services/actions/user';
import { PASSWORD_PLACEHOLDER } from '../../utils/constants';

function Profile() {
  const { logoutSuccess } = useSelector(state => state.auth);
  const { name, email } = useSelector(state => state.auth.user);

  const [user, setUser] = useState({
    name: name,
    email: email,
    password: PASSWORD_PLACEHOLDER,
  });

  const onUpdateField = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSaveChanges(e) {
    e.preventDefault();

    const updatedFields = {
      email: user.email,
      name: user.name,
    };

    if (user.password.length !== 0 || user.password.indexOf('*') === -1) {
      updatedFields.password = user.password;
    }

    dispatch(updateUser(updatedFields));
    setUser(prevState => ({ ...prevState, password: PASSWORD_PLACEHOLDER }));
  }

  const onCancelChanges = e => {
    e.preventDefault();
    setUser({ name: name, email: email, password: PASSWORD_PLACEHOLDER });
  };

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
          onChange={onUpdateField}
          value={user.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
          icon={'EditIcon'}
        />

        <EmailInput
          onChange={onUpdateField}
          value={user.email}
          name={'email'}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
          icon={'EditIcon'}
        />
        <PasswordInput
          onChange={onUpdateField}
          value={user.password}
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
            onClick={onCancelChanges}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-30"
            onClick={onSaveChanges}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </article>
  );
}

export default Profile;
