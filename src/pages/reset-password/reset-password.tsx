import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNewPassword } from '../../services/actions/user';

function ResetPassword() {
  const [form, setValue] = useState({ password: '', token: '' });
  const { newPasswordSuccess } = useSelector((state) => state.auth);

  const location = useLocation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createNewPassword(form));
  }

  useEffect(() => {
    if (newPasswordSuccess) {
      navigate('/');
    }

    if (location.state === null) {
      navigate(-1);
    }
  }, [location.state, navigate, newPasswordSuccess]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        placeholder={'Введите новый пароль'}
        extraClass='mb-6'
      />
      <EmailInput
        onChange={onChange}
        value={form.token}
        name={'token'}
        placeholder={'Введите код из письма'}
        isIcon={true}
        extraClass='mb-6'
      />

      <Button htmlType='submit' type='primary' size='large'>
        Сохранить
      </Button>

      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль?{' '}
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default ResetPassword;
