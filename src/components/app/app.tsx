import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BASE_URL } from '../../utils/constants';

function App() {
  const [data, setData] = useState({
    burgers: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(BASE_URL)
      .then(res => res.json())
      .then(burgersData => {
        setData({ ...data, burgers: burgersData.data });
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setData({ ...data });
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className={appStyles.app}>
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
