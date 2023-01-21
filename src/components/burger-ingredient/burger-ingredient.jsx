import React from 'react';
import burgerStyles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

function BurgerIngredient(props) {
  const { ingredientData, onCardClick, onOpen, count } = props;

  function handleClick() {
    onCardClick(ingredientData);
    onOpen();
  }

  return (
    <div className={burgerStyles.container} onClick={handleClick}>
      {count && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={ingredientData.image} alt="ингредиент" />
      <div className={burgerStyles.container__wrapper}>
        <p className={burgerStyles.container__wrapper_desc}>
          {ingredientData.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredientData.name}</p>
    </div>
  );
}

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default React.memo(BurgerIngredient);
