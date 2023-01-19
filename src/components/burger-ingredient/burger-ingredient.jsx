import React from 'react';
import burgerStyles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';

function BurgerIngredient(props) {
  const { data, onCardClick, onOpen } = props;

  function handleClick() {
    onCardClick(data);
    onOpen();
  }

  return (
    <div className={burgerStyles.container} onClick={handleClick}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={data.image} alt="ингредиент" />
      <div className={burgerStyles.container__wrapper}>
        <p className={burgerStyles.container__wrapper_desc}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </div>
  );
}

BurgerIngredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default BurgerIngredient;
