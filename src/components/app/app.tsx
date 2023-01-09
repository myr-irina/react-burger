import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import Main from '../main/main';

function App() {
  return (
    <section className={appStyles.app}>
      <AppHeader />
      <Main />
    </section>
  );
}

export default App;
