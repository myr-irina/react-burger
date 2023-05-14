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
