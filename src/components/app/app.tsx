import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import { data } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';

function App() {
  return (
    <section className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.container}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </section>
  );
}

// App.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default App;
