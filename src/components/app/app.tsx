import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';

function App() {
  return (
    <section className={appStyles.app}>
      <AppHeader />
    </section>
  );
}

export default App;
