import React, { useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';

import styles from './styles.module.scss';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { updateUser } from '../../services/actions/user';
import { PASSWORD_PLACEHOLDER } from '../../utils/constants';

type UpdatedFields = {
  email: string;
  name: string;
  password?: string;
};

function Profile() {
  const { name, email } = useSelector((state) => state.auth.user);
  const [isEditMode, setIsEditMode] = useState(false);

  const [user, setUser] = useState({
    name: name,
    email: email,
    password: PASSWORD_PLACEHOLDER,
  });

  const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  function onSaveChanges(e: SyntheticEvent<Element, Event>) {
    e.preventDefault();

    const updatedFields: UpdatedFields = {
      email: user.email,
      name: user.name,
    };

    if (user.password.length !== 0 || user.password.indexOf('*') === -1) {
      updatedFields.password = user.password;
    }

    dispatch(updateUser(updatedFields));
    setUser((prevState) => ({ ...prevState, password: PASSWORD_PLACEHOLDER }));
    setIsEditMode(false);
  }

  const onCancelChanges = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setUser({ name: name, email: email, password: PASSWORD_PLACEHOLDER });
    setIsEditMode(false);
  };

  function handleEditing() {
    setIsEditMode(true);
  }

  return (
    <article className={styles.container}>
      <form>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onUpdateField}
          value={user.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
          icon={'EditIcon'}
          disabled={!isEditMode}
          onIconClick={handleEditing}
        />

        <EmailInput
          onChange={onUpdateField}
          value={user.email}
          name={'email'}
          placeholder='Логин'
          isIcon={true}
          extraClass='mb-6'
        />
        <PasswordInput
          onChange={onUpdateField}
          value={user.password}
          name={'password'}
          extraClass='mb-6'
          icon={'EditIcon'}
          disabled={!isEditMode}
        />
        {isEditMode && (
          <div className={styles.wrapper}>
            <Button
              htmlType='button'
              type='secondary'
              size='large'
              extraClass='mb-30'
              onClick={onCancelChanges}
              disabled={!isEditMode}
            >
              Отмена
            </Button>
            <Button
              htmlType='submit'
              type='primary'
              size='medium'
              extraClass='mb-30'
              onClick={onSaveChanges}
              disabled={!isEditMode}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </article>
  );
}

export default Profile;
