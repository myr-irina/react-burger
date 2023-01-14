import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BASE_URL } from '../../utils/constants';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

function App() {
  const [data, setData] = useState({
    burgers: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: '',
    proteins: null,
    fat: null,
    carbohydrates: null,
    calories: null,
    image: '',
  });

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

  function handleIngredientModalOpen() {
    setIsIngredientModalOpen(true);
  }

  function handleOrderDetailsOpenModal() {
    setIsOrderDetailsModalOpen(true);
  }

  function handleCardClick(
    card: React.SetStateAction<{
      name: string;
      proteins: null;
      fat: null;
      carbohydrates: null;
      calories: null;
      image: string;
    }>
  ) {
    setModalContent(card);
  }

  function handleCloseModal() {
    setIsOrderDetailsModalOpen(false);
    setIsIngredientModalOpen(false);
    setModalContent({
      name: '',
      proteins: null,
      fat: null,
      carbohydrates: null,
      calories: null,
      image: '',
    });
  }

  return (
    <>
      <section className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.container}>
          <BurgerIngredients
            data={data.burgers}
            isLoading={isLoading}
            onCardClick={handleCardClick}
            onOpen={handleIngredientModalOpen}
          />
          <BurgerConstructor
            data={data.burgers}
            onOpen={handleOrderDetailsOpenModal}
          />
        </main>
      </section>
      {isOrderDetailsModalOpen && (
        <Modal
          title={null}
          handleClose={handleCloseModal}
          children={<OrderDetails />}
        />
      )}
      {isIngredientModalOpen && (
        <Modal
          title="Детали ингредиента"
          children={<IngredientDetails modalContent={modalContent} />}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
