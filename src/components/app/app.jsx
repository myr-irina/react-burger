import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </section>
    </>
  );
}

export default App;