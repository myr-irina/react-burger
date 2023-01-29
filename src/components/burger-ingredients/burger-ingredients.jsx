import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './burger-ingredients.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import { ingredientPropTypes } from '../../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { getIngredientsData } from '../services/actions/ingredients';
import { fetchIngredients } from '../services/actions/ingredients';

function BurgerIngredients() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    store => store.ingredients
  );
  console.log(ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTub, setCurrentTub] = useState('buns');

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

  const buns = useMemo(
    () => ingredients.filter(item => item.type === 'bun'),
    [ingredients]
  );

  const fillings = useMemo(
    () => ingredients.filter(item => item.type === 'main'),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter(item => item.type === 'sauce'),
    [ingredients]
  );

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.container__header}>Соберите бургер</h2>
        <nav>
          <ul className={styles.container__menu}>
            <Tab
              value="buns"
              active={currentTub === 'buns'}
              onClick={onTabClick}
            >
              Булки
            </Tab>
            <Tab
              value="sauces"
              active={currentTub === 'sauces'}
              onClick={onTabClick}
            >
              Соусы
            </Tab>
            <Tab
              value="fillings"
              active={currentTub === 'fillings'}
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

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
// };

export default BurgerIngredients;
