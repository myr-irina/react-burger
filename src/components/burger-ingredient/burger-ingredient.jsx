import React from 'react';
import burgerStyles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

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
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default BurgerIngredient;
