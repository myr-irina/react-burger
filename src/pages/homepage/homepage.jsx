import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../../components/app-header/app-header';
import styles from './styles.module.scss';

import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <AppHeader />
      <section className={styles.app}>
        <Outlet />
      </section>
    </>
  );
}

export default HomePage;
