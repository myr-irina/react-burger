import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../utils/constants';
import Preloader from '../preloader/preloader';

import { IngredientsContext } from '../services/appContext';
import { OrderContext } from '../services/appContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = React.useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getIngredients()
      .then(setIngredients)
      .catch(err => {
        alert(`Во время загрузки ингредиентов произошла ошибка ${err.message}`);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <section className={appStyles.app}>
          {hasError && <p>Произошла ошибка</p>}
          <main className={appStyles.container}>
            <BurgerIngredients data={ingredients} />
            <IngredientsContext.Provider
              value={{ ingredients, setIngredients }}
            >
              <OrderContext.Provider value={{ order, setOrder }}>
                <BurgerConstructor />
              </OrderContext.Provider>
            </IngredientsContext.Provider>
          </main>
        </section>
      )}
    </>
  );
}

export default App;
