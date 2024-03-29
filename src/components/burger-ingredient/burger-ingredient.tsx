import React from 'react';
import { useDrag } from 'react-dnd';

import burgerStyles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientType } from '../../services/types/types-ingredient';

type BurgerIngredientProps = {
  ingredientData: TIngredientType;
  onCardClick: (obj: TIngredientType) => void;
  onOpen: () => void;
  count: number;
};

type TDragCollectedPropsType = {
  opacity: number;
};

function BurgerIngredient(props: BurgerIngredientProps) {
  const { ingredientData, onCardClick, onOpen, count } = props;

  function handleClick() {
    onCardClick(ingredientData);
    onOpen();
  }

  const [{ opacity }, ref] = useDrag<
    TIngredientType,
    unknown,
    TDragCollectedPropsType
  >({
    type: 'fillingsItem',
    item: ingredientData,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: !!monitor.getItem(),
    }),
  });

  return (
    <div
      className={burgerStyles.container}
      onClick={handleClick}
      style={{ opacity }}
      ref={ref}
      data-testid="ingredient-container"
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img
        src={ingredientData.image}
        alt={`изображение ${ingredientData.name}`}
      />
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

export default React.memo(BurgerIngredient);
