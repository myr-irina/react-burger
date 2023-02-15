import React from 'react';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {
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
    <article className={styles.container}>
      <div className={styles.left}>
        <ul className={styles.list}>
          <li>
            <p className="text text_type_main-medium pb-6">Профиль</p>
          </li>
          <li>
            <p className="text text_type_main-medium text_color_inactive pt-4 pb-4">
              История заказов
            </p>
          </li>
          <li>
            <p className="text text_type_main-medium text_color_inactive pt-6">
              Выход
            </p>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form>
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
      </form>
    </article>
  );
}

export default Profile;
