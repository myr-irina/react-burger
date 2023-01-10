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
      <ul style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="mr-2">
          <li className={headerStyles.wrapper}>
            <div className="pr-2">
              <BurgerIcon type="primary" />
            </div>
            <p className="text text_type_main-default">Конструктор</p>
          </li>
        </div>
        <li className={`${headerStyles.wrapper} ml-2`}>
          <div className="pr-2">
            <ListIcon type="secondary" />
          </div>
          <p className="text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </li>
      </ul>
      <Logo />

      <section className={headerStyles.wrapper}>
        <div className="pr-2">
          <ProfileIcon type="secondary" />
        </div>
        <p className="text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </section>
    </section>
  );
}

export default AppHeader;
