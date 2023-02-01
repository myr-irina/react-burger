import React from 'react';
import { useSelector } from 'react-redux';

import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

const IngredientsCategory = React.forwardRef(
  ({ title, titleId, ingredients, onOpen, onCardClick }, ref) => {
    const { bun, fillings } = useSelector(store => store.burgerConstructor);
    const bunId = bun.length !== 0 ? bun._id : [];

    return (
      <>
        <h3 className="text text_type_main-medium mt-10 mb-6" id={titleId}>
          {title}
        </h3>
        <div ref={ref} className={styles.main}>
          {ingredients.map(ingredient => {
            const count =
              bunId === ingredient._id
                ? 2
                : fillings.filter(item => item._id === ingredient._id).length;
            return (
              <BurgerIngredient
                ingredientData={ingredient}
                key={ingredient._id}
                count={count}
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
