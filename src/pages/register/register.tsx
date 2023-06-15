import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { register } from '../../services/actions/user';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerSuccess } = useSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(form));
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate('/login');
    }
  }, [navigate, registerSuccess]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className='text text_type_main-medium mb-6'>Регистрация</p>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        icon={'CurrencyIcon'}
        value={form.name}
        name={'name'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='mb-6'
      />

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
        Зарегистрироваться
      </Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Уже зарегистрированы?{' '}
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
