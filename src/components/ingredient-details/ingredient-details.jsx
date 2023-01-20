import React from 'react';
import styles from './ingredient-details.module.scss';
import { ingredientPropTypes } from '../../utils/prop-types';

function IngredientDetails({ content }) {
  return (
    <>
      <img className={styles.image} src={content.image} alt="ингредиент" />
      <p className={`${'text text_type_main-medium'} mt-4 mb-8`}>
        {content.name}
      </p>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2 `}
          >
            Калории, ккал
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {content.calories}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2 `}
          >
            Белки, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {content.proteins}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2`}
          >
            Жиры, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {content.fat}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2`}
          >
            Углеводы, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {content.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  content: ingredientPropTypes.isRequired,
};

export default IngredientDetails;
