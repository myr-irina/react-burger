import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import Main from '../main/main';
import { data } from '../../utils/data';

function App() {
  return (
    <section className={appStyles.app}>
      <AppHeader />
      <Main data={data} />
    </section>
  );
}

export default App;
