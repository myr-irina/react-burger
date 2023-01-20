import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../utils/constants';
import Preloader from '../preloader/preloader';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = React.useState(false);

  useEffect(() => {
    getIngredients()
      .then(setIngredients)
      .catch(() => {
        alert('Во время загрузки ингредиентов произошла ошибка');
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
            <BurgerConstructor data={ingredients} />
          </main>
        </section>
      )}
    </>
  );
}

export default App;
