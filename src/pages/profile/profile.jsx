import React from 'react';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import ProfileLink from '../../components/profile-link/profile-link';

function Profile() {
  const [value, setValue] = React.useState('');
  const [name, setName] = React.useState('');
  const inputRef = React.useRef(null);

  const PATH_PROFILE = '/profile';
  const PATH_ORDER_HISTORY = '/profile/orders';
  const PATH_LOGOUT = '/logout';

  const active = styles.active;
  const inActive = styles.inActive;
  const isActive = ({ isActive }) => (isActive ? active : inActive);

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
        <nav className={styles.list}>
          <li>
            <ProfileLink title="Профиль" path={PATH_PROFILE} />
          </li>
          <li>
            <ProfileLink title="История заказов" path={PATH_ORDER_HISTORY} />
          </li>
          <li>
            <ProfileLink title="Выход" path={PATH_LOGOUT} />
          </li>

          {/* <li>
            <NavLink to="/profile" className={isActive}>
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className={isActive}>
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink to="/2" className={isActive}>
              Выход
            </NavLink>
          </li> */}
        </nav>
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
