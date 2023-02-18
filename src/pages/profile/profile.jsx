import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate } from 'react-router-dom';
import {
  PATH_LOGOUT,
  PATH_PROFILE,
  PATH_ORDER_HISTORY,
} from '../../utils/constants';
import ProfileLink from '../../components/profile-link/profile-link';
import { logout } from '../../services/actions/user';

function Profile() {
  const [value, setValue] = React.useState('');
  const [name, setName] = React.useState('');
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutSuccess } = useSelector(state => state.auth);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  const onChange = e => {
    setValue(e.target.value);
  };

  function handleLogout(e) {
    console.log('click');
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
