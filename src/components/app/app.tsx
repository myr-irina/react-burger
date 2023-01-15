import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BASE_URL } from '../../utils/constants';
import { checkReponse } from '../../utils/constants';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';

function App() {
  const [data, setData] = useState({
    burgers: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = React.useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    fetch(BASE_URL)
      .then(checkReponse)
      .then(burgersData => {
        setData({ ...data, burgers: burgersData.data });
        setIsLoading(false);
      })
      .catch(e => {
        setData({ ...data });
        setIsLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <section className={appStyles.app}>
        {hasError && <p>Произошла ошибка</p>}
        <AppHeader />
        <main className={appStyles.container}>
          <BurgerIngredients data={data.burgers} isLoading={isLoading} />
          <BurgerConstructor data={data.burgers} />
        </main>
      </section>
    </>
  );
}

export default App;
