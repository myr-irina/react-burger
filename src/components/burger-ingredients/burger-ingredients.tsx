import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';

import styles from './burger-ingredients.module.scss';

import IngredientsCategory from '../ingredients-category/ingredients-category';
import Preloader from '../preloader/preloader';
import { SET_INGREDIENT_DATA } from '../../services/constants/ingredient-details';
import { TIngredientType } from '../../services/types/types-ingredient';

function BurgerIngredients() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('buns');

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients,
  );

  const buns = useMemo(
    () => ingredients.filter((item: TIngredientType) => item.type === 'bun'),
    [ingredients],
  );

  const fillings = useMemo(
    () => ingredients.filter((item: TIngredientType) => item.type === 'main'),
    [ingredients],
  );

  const sauces = useMemo(
    () => ingredients.filter((item: TIngredientType) => item.type === 'sauce'),
    [ingredients],
  );

  const dispatch = useDispatch();

  const [bunsRef, inViewBunsRef] = useInView({ threshold: 0.2 });
  const [saucesRef, inViewSaucesRef] = useInView({ threshold: 0.4 });
  const [fillingsRef, inViewFillingsRef] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewFillingsRef) {
      setCurrentTab('fillings');
    } else if (inViewBunsRef) {
      setCurrentTab('buns');
    } else if (inViewSaucesRef) {
      setCurrentTab('sauces');
    }
  }, [fillings, inViewBunsRef, inViewFillingsRef, inViewSaucesRef]);

  function handleCardClick(ingredient: TIngredientType) {
    dispatch({ type: SET_INGREDIENT_DATA, payload: ingredient });
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function onTabClick(tab: string) {
    setCurrentTab(tab);
    const element = document.getElementById(tab);

    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  if (ingredientsFailed) {
    return <p>Произошла ошибка при загрузке данных.</p>;
  }

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.container__header}>Соберите бургер</h2>
        <nav>
          <ul className={styles.container__menu}>
            <Tab
              value="buns"
              active={currentTab === 'buns'}
              onClick={onTabClick}
            >
              Булки
            </Tab>
            <Tab
              value="sauces"
              active={currentTab === 'sauces'}
              onClick={onTabClick}
            >
              Соусы
            </Tab>
            <Tab
              value="fillings"
              active={currentTab === 'fillings'}
              onClick={onTabClick}
            >
              Начинки
            </Tab>
          </ul>
        </nav>

        <div
          className={styles.container__list}
          data-testid="ingredients-container"
        >
          {ingredientsRequest ? (
            <Preloader />
          ) : (
            <>
              <section>
                <IngredientsCategory
                  title="Булки"
                  titleId="buns"
                  ingredients={buns}
                  onOpen={handleOpenModal}
                  onCardClick={handleCardClick}
                  ref={bunsRef}
                />
              </section>
              <section className={`${styles.container__section} mt-10`}>
                <IngredientsCategory
                  title="Соусы"
                  titleId="sauces"
                  ingredients={sauces}
                  onOpen={handleOpenModal}
                  onCardClick={handleCardClick}
                  ref={saucesRef}
                />
              </section>
              <section className={`${styles.container__section} mt-10`}>
                <IngredientsCategory
                  title="Начинки"
                  titleId="fillings"
                  ingredients={fillings}
                  onOpen={handleOpenModal}
                  onCardClick={handleCardClick}
                  ref={fillingsRef}
                />
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default BurgerIngredients;
