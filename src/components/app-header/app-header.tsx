import React, { useMemo } from 'react';
import headerStyles from './app-header.module.scss';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import { NavLink, useLocation } from 'react-router-dom';

function AppHeader() {
  const location = useLocation();

  const activeLink = useMemo(() => {
    if (
      location.pathname === '/' ||
      location.pathname.includes('/ingredients')
    ) {
      return 'ingredients';
    } else if (location.pathname.includes('/feed')) {
      return 'feed';
    } else if (location.pathname.includes('/profile')) {
      return 'login';
    } else {
      return;
    }
  }, [location.pathname]);

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.wrapper}>
        <ul className={headerStyles.block}>
          <NavLink to='/' className={headerStyles.link}>
            <li className={`${headerStyles.block}`}>
              <BurgerIcon
                type={activeLink === 'ingredients' ? 'primary' : 'secondary'}
              />
              <p
                className={`text text_type_main-default ${
                  activeLink === 'ingredients'
                    ? headerStyles.active
                    : 'text_color_inactive'
                } ml-2`}
              >
                Конструктор
              </p>
            </li>
          </NavLink>

          <NavLink to='/feed' className={headerStyles.link}>
            <li className={headerStyles.block}>
              <ListIcon
                type={activeLink === 'feed' ? 'primary' : 'secondary'}
              />
              <p
                className={`text text_type_main-default ${
                  activeLink === 'feed'
                    ? headerStyles.active
                    : 'text_color_inactive'
                } ml-2`}
              >
                Лента заказов
              </p>
            </li>
          </NavLink>
        </ul>

        <NavLink to='/' className={headerStyles.link_logo}>
          <Logo />
        </NavLink>

        <NavLink to='/profile' className={headerStyles.link}>
          <div className={headerStyles.block}>
            <ProfileIcon
              type={activeLink === 'login' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default ${
                activeLink === 'login'
                  ? headerStyles.active
                  : 'text_color_inactive'
              } ml-2`}
            >
              Личный кабинет
            </p>
          </div>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
