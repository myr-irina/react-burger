import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {
  const [value, setValue] = React.useState('');
  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.container}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder={'Укажите e-mail'}
        isIcon={true}
        extraClass="mb-20"
      />

      <Button htmlType="button" type="primary" size="large">
        Восстановить
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{' '}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default ResetPassword;
