import React from 'react';
import headerStyles from './app-header.module.scss';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <nav className={headerStyles.header}>
      <ul className={headerStyles.wrapper}>
        <li className={`${headerStyles.wrapper} mr-2`}>
          <BurgerIcon type="primary" />
          <Link to="/" className={headerStyles.link}>
            Конструктор
          </Link>
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
    </nav>
  );
}

export default AppHeader;
