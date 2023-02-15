import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function Login() {
  const [value, setValue] = React.useState('');
  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.container}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="large">
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
        <Link className={styles.link} to="/reset-password">
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
}

export default Login;
