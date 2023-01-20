import React, { useState, useMemo } from 'react';
import styles from './burger-ingredients.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';

function BurgerIngredients({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTub, setCurrentTub] = useState('bun');

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function onTabClick(tab) {
    setCurrentTub(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  const buns = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
  const fillings = useMemo(
    () => data.filter(item => item.type === 'main'),
    [data]
  );
  const sauces = useMemo(
    () => data.filter(item => item.type === 'sauce'),
    [data]
  );

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.container__header}>Соберите бургер</h2>
        <nav>
          <ul className={styles.container__menu}>
            <Tab
              value="buns"
              active={currentTub === 'bun'}
              onClick={onTabClick}
            >
              Булки
            </Tab>
            <Tab
              value="sauces"
              active={currentTub === 'sauce'}
              onClick={onTabClick}
            >
              Соусы
            </Tab>
            <Tab
              value="fillings"
              active={currentTub === 'filling'}
              onClick={onTabClick}
            >
              Начинки
            </Tab>
          </ul>
        </nav>

        <div className={styles.container__list}>
          <section>
            <IngredientsCategory
              title="Булки"
              titleId="buns"
              ingredients={buns}
              onOpen={handleOpenModal}
              onCardClick={handleCardClick}
            />
          </section>
          <section className={`${styles.container__section} mt-10`}>
            <IngredientsCategory
              title="Соусы"
              titleId="sauces"
              ingredients={sauces}
              onOpen={handleOpenModal}
              onCardClick={handleCardClick}
            />
          </section>
          <section className={`${styles.container__section} mt-10`}>
            <IngredientsCategory
              title="Начинки"
              titleId="fillings"
              ingredients={fillings}
              onOpen={handleOpenModal}
              onCardClick={handleCardClick}
            />
          </section>
        </div>
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
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;
