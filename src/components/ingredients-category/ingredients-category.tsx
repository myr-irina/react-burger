import React from 'react';
import { useSelector } from 'react-redux';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { getIngredientsCount } from '../../services/selectors/burger-constructor';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient } from '../../types/types-burger';

type IngredientsCategoryProps = {
  title: string;
  titleId: string;
  ingredients: Ingredient[];
  onOpen: (obj: object) => void;
  onCardClick: (obj: object) => void;
};

interface RefObject<T> {
  readonly current: T | null | undefined;
}

const IngredientsCategory = React.forwardRef(
  (
    {
      title,
      titleId,
      ingredients,
      onOpen,
      onCardClick,
    }: IngredientsCategoryProps,
    ref
  ) => {
    const counters = useSelector(getIngredientsCount);
    const location = useLocation();

    return (
      <>
        <h3 className='text text_type_main-medium mt-10 mb-6' id={titleId}>
          {title}
        </h3>

        <div ref={ref} className={styles.main}>
          {ingredients.map((ingredient) => {
            return (
              <Link
                key={ingredient._id}
                to={`/ingredients/${ingredient._id}`}
                state={{ background: location }}
              >
                <BurgerIngredient
                  ingredientData={ingredient}
                  key={ingredient._id}
                  count={counters[ingredient._id]}
                  onOpen={onOpen}
                  onCardClick={onCardClick}
                />
              </Link>
            );
          })}
        </div>
      </>
    );
  }
);

export default React.memo(IngredientsCategory);
