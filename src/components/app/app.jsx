import React, { useState } from 'react';

import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { OrderContext } from '../services/appContext';

function App() {
  const [order, setOrder] = useState(null);

  return (
    <>
      <AppHeader />
      <section className={appStyles.app}>
        <main className={appStyles.container}>
          <BurgerIngredients />
          {/* <OrderContext.Provider value={{ order, setOrder }}>
            <BurgerConstructor />
          </OrderContext.Provider> */}
        </main>
      </section>
    </>
  );
}

export default App;
