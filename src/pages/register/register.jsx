import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function Register() {
  const [value, setValue] = React.useState('');
  const [name, setName] = React.useState('');
  const inputRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.container}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setName(e.target.value)}
        icon={'CurrencyIcon'}
        value={name}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />

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
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{' '}
        <Link className={styles.link} to="/">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
