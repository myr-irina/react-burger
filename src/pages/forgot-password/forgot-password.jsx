import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/user';
import { useNavigate, useLocation } from 'react-router-dom';

function ForgotPssword() {
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const { resetPasswordSuccess } = useSelector(state => state.auth);
  const location = useLocation();

  const onChange = e => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPassword(email));
  }

  useEffect(() => {
    if (resetPasswordSuccess) {
      navigate('/reset-password', { state: { from: location.pathname } });
    }
  }, [resetPasswordSuccess, navigate, location.pathname]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        onChange={onChange}
        value={email}
        name={'email'}
        placeholder={'Укажите e-mail'}
        isIcon={true}
        extraClass="mb-20"
      />

      <Button htmlType="submit" type="primary" size="large" disabled={!email}>
        Восстановить
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{' '}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default ForgotPssword;
