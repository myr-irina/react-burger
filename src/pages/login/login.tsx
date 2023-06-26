import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { login } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';

function Login() {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const { loginFailed } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(values));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className="text text_type_main-medium mb-6">Вход</p>

      {loginFailed && (
        <span className={`${styles.messagerror} text text_type_main-default`}>
          Ошибка! Не верно указаны логин или пароль.
        </span>
      )}

      <Input
        onChange={handleChange}
        value={values.email}
        name="email"
        placeholder="Логин"
        extraClass="mb-6"
        data-testid="login-email-input"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name="password"
        extraClass="mb-6"
        data-testid="login-password-input"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        disabled={!values}
        data-testid="login-button"
      >
        Войти
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{' '}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{' '}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
}

export default Login;
