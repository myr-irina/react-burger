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
      <div style={{ display: 'flex', flexDirection: 'row' }} className="mr-5">
        <section className={headerStyles.wrapper}>
          <div className="pr-2">
            <BurgerIcon type="primary" />
          </div>
          <p className="text text_type_main-default">Конструктор</p>
        </section>

        <section className={headerStyles.wrapper}>
          <div className="pr-2">
            <ListIcon type="secondary" />
          </div>
          <p className="text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </section>
      </div>
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
