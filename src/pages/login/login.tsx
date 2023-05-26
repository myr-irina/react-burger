import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

import { login } from '../../services/actions/user';
import { useSelector } from 'react-redux';

function Login() {
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const { loginFailed } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(form));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className='text text_type_main-medium mb-6'>Вход</p>

      {loginFailed && (
        <span className={`${styles.messagerror} text text_type_main-default`}>
          Ошибка! Не верно указаны логин или пароль.
        </span>
      )}

      <EmailInput
        onChange={onChange}
        value={form.email}
        name={'email'}
        placeholder='Логин'
        isIcon={true}
        extraClass='mb-6'
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        extraClass='mb-6'
      />
      <Button htmlType='submit' type='primary' size='large' disabled={!form}>
        Войти
      </Button>

      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вы — новый пользователь?{' '}
        <Link className={styles.link} to='/register'>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль?{' '}
        <Link className={styles.link} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
}

export default Login;
