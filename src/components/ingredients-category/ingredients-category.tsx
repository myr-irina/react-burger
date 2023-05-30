import React from 'react';
import { useSelector } from '../../services/hooks';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import styles from './styles.module.scss';

import { getIngredientsCount } from '../../services/selectors/burger-constructor';
import { Link, useLocation } from 'react-router-dom';
import { TIngredientType } from '../../services/types/types-ingredient';

type IngredientsCategoryProps = {
  title: string;
  titleId: string;
  ingredients: TIngredientType[];
  onOpen: () => void;
  onCardClick: (obj: TIngredientType) => void;
};

const IngredientsCategory = React.forwardRef<
  HTMLInputElement,
  IngredientsCategoryProps
>(({ title, titleId, ingredients, onOpen, onCardClick }, ref) => {
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
});

export default React.memo(IngredientsCategory);
