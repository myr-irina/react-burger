import React, { useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import { useDrop, useDrag, XYCoord } from 'react-dnd';

import styles from './styles.module.scss';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
  DELETE_BURGER_INGREDIENT,
  REORDER_BURGER_INGREDIENTS,
} from '../../services/constants/burger-constructor';
import { TIngredientType, TIngredientTypeWithId } from '../../services/types/types-ingredient';
import type { Identifier } from 'dnd-core';

type IngredientsBoxProps = {
  element: TIngredientType;
  index: number;
};

type TDragCollectedPropsType = {
  isDragging: boolean;
};

type TIngredientDragType = {
  index: number;
};

type TDropCollectedPropTypes = {
  handlerId: Identifier | null;
};

function IngredientsBox({ element, index }: IngredientsBoxProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<
    TIngredientDragType,
    unknown,
    TDropCollectedPropTypes
  >({
    accept: ['sort'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: REORDER_BURGER_INGREDIENTS,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    TIngredientDragType,
    unknown,
    TDragCollectedPropsType
  >({
    type: 'sort',
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (element.type !== 'bun') drag(drop(ref));

  return (
    <li
      className={`${styles.block} ml-4`}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type={'secondary'} />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={() =>
          dispatch({
            type: DELETE_BURGER_INGREDIENT,
            payload: index,
          })
        }
      />
    </li>
  );
}

export default IngredientsBox;
