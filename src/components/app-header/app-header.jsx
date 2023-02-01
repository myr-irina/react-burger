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
    <header className={headerStyles.header}>
      <nav className={headerStyles.wrapper}>
        <ul className={headerStyles.block}>
          <Link to="/" className={headerStyles.link}>
            <li className={`${headerStyles.block}`}>
              <BurgerIcon type="primary" />
              <p className={`${headerStyles.link_text}`}>Конструктор</p>
            </li>
          </Link>

          <Link to="/" className={headerStyles.link_inactive}>
            <li className={headerStyles.block}>
              <ListIcon type="secondary" />
              <p
                className={`${'text_type_main-default text_color_inactive'} pl-2`}
              >
                Лента заказов
              </p>
            </li>
          </Link>
        </ul>
        <Link to="/" className={headerStyles.link_logo}>
          <Logo />
        </Link>

        <Link to="/" className={headerStyles.link_inactive}>
          <div className={headerStyles.block}>
            <ProfileIcon type="secondary" />
            <p
              className={`${'text_type_main-default text_color_inactive'} pl-2`}
            >
              Личный кабинет
            </p>
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;
