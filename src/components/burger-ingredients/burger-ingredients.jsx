import React, { useState } from 'react';
import burgersStyles from './burger-ingredients.module.scss';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Tabs from '../tabs/tabs';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

function BurgerIngredients({ data, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  // const [selectedCard, setSelectedCard] = useState({
  //   name: '',
  //   proteins: null,
  //   fat: null,
  //   carbohydrates: null,
  //   calories: null,
  //   image: '',
  // });
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <main className={burgersStyles.container}>
        <h2 className={burgersStyles.container__header}>Соберите бургер</h2>
        <Tabs />
        {isLoading ? (
          <p className={`${'text text_type_main-medium'} mt-6 ml-4`}>
            Данные загружаются
          </p>
        ) : (
          <div className={burgersStyles.container__list}>
            <section className={`${burgersStyles.container__section} mt-10`}>
              <h2 className="text text_type_main-medium">Булки</h2>
              <div className={burgersStyles.container__main}>
                {data
                  .filter(data => data.type === 'bun')
                  .map(filteredburger => {
                    return (
                      <li key={filteredburger._id}>
                        <BurgerIngredient
                          data={filteredburger}
                          onOpen={handleOpenModal}
                          onCardClick={handleCardClick}
                        />
                      </li>
                    );
                  })}
              </div>
            </section>
            <section className={`${burgersStyles.container__section} mt-10`}>
              <h2 className="text text_type_main-medium">Соусы</h2>
              <div className={burgersStyles.container__main}>
                {data
                  .filter(data => data.type === 'sauce')
                  .map(filteredburger => {
                    return (
                      <li key={filteredburger._id}>
                        <BurgerIngredient
                          data={filteredburger}
                          onOpen={handleOpenModal}
                          onCardClick={handleCardClick}
                        />
                      </li>
                    );
                  })}
              </div>
            </section>
            <section className={`${burgersStyles.container__section} mt-10`}>
              <h2 className="text text_type_main-medium">Основное</h2>
              <div className={burgersStyles.container__main}>
                {data
                  .filter(data => data.type === 'main')
                  .map(filteredburger => {
                    return (
                      <li key={filteredburger._id}>
                        <BurgerIngredient
                          data={filteredburger}
                          onOpen={handleOpenModal}
                          onCardClick={handleCardClick}
                        />
                      </li>
                    );
                  })}
              </div>
            </section>
          </div>
        )}
      </main>

      {isOpen && (
        <Modal title="Детали ингредиента" handleClose={handleCloseModal}>
          <IngredientDetails content={selectedCard} />
        </Modal>
      )}
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
  isloading: PropTypes.bool,
};

export default BurgerIngredients;
