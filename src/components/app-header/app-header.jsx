import React from 'react';
import headerStyles from './app-header.module.scss';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';

function AppHeader() {
  return (
    <section className={headerStyles.header}>
      <ul className={headerStyles.wrapper}>
        <li className={`${headerStyles.wrapper} mr-2`}>
          <BurgerIcon type="primary" />
          <p className={`${'text_type_main-default'} pl-2`}>Конструктор</p>
        </li>

        <li className={headerStyles.wrapper}>
          <ListIcon type="secondary" />
          <p className={`${'text_type_main-default text_color_inactive'} pl-2`}>
            Лента заказов
          </p>
        </li>
      </ul>
      <Logo />

      <section className={headerStyles.wrapper}>
        <ProfileIcon type="secondary" />
        <p className={`${'text_type_main-default text_color_inactive'} pl-2`}>
          Личный кабинет
        </p>
      </section>
    </section>
  );
}

export default AppHeader;
