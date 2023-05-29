import React from 'react';
import { useDrag } from 'react-dnd';

import burgerStyles from './burger-ingredient.module.scss';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientType, TIngredientTypeWithId } from '../../services/types/types-ingredient';

type BurgerIngredientProps = {
  ingredientData: TIngredientTypeWithId;
  onCardClick: (obj: TIngredientType) => void;
  onOpen: () => void;
  count: number;
};

type TIngredientDragType = {
  item: TIngredientTypeWithId;
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
    TIngredientDragType,
    unknown,
    TDragCollectedPropsType
  >({
    type: 'fillingsItem',
    item:  ingredientData ,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      className={burgerStyles.container}
      onClick={handleClick}
      style={{ opacity }}
      ref={ref}
    >
      {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
      <img
        src={ingredientData.image}
        alt={`изображение ${ingredientData.name}`}
      />
      <div className={burgerStyles.container__wrapper}>
        <p className={burgerStyles.container__wrapper_desc}>
          {ingredientData.price}
        </p>
        <CurrencyIcon type='primary' />
      </div>
      <p className='text text_type_main-default'>{ingredientData.name}</p>
    </div>
  );
}

export default React.memo(BurgerIngredient);
