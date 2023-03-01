import React from 'react';
import { useSelector } from 'react-redux';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { getIngredientsCount } from '../../services/selectors/burger-constructor';

const IngredientsCategory = React.forwardRef(
  ({ title, titleId, ingredients, onOpen, onCardClick }, ref) => {
    const counters = useSelector(getIngredientsCount);

    return (
      <>
        <h3 className="text text_type_main-medium mt-10 mb-6" id={titleId}>
          {title}
        </h3>

        <div ref={ref} className={styles.main}>
          {ingredients.map(ingredient => {
            return (
              <BurgerIngredient
                ingredientData={ingredient}
                key={ingredient._id}
                count={counters[ingredient._id]}
                onOpen={onOpen}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>
      </>
    );
  }
);

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  onOpen: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default React.memo(IngredientsCategory);
