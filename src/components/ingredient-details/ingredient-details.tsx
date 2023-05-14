import React, { useMemo, useEffect, useState } from 'react';
import styles from './ingredient-details.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../types/types-burger';

function IngredientDetails() {
  const ingredientsArray = useSelector(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (store) => store.ingredients.ingredients
  );

  const { id } = useParams();

  const [ingredient, setIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    const ingredient = ingredientsArray.find(
      (elem: Ingredient) => elem._id === id
    );
    setIngredient(ingredient);
  }, [id, ingredientsArray]);

  if (!ingredient) {
    return null;
  }

  return (
    <>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={`изображение ${ingredient.name}`}
      />
      <p className={`${'text text_type_main-medium'} mt-4 mb-8`}>
        {ingredient.name}
      </p>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2 `}
          >
            Калории, ккал
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2 `}
          >
            Белки, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2`}
          >
            Жиры, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2`}
          >
            Углеводы, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
