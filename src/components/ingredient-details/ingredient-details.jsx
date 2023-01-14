import React from 'react';
import styles from './ingredient-details.module.scss';

function IngredientDetails({ modalContent }) {
  return (
    <>
      {/* <h2 className={styles.header}>
        <p className={`${'text text_type_main-large'} mt-4 mb-8`}>{title}</p>
      </h2> */}
      <img className={styles.image} src={modalContent.image} alt="ингредиент" />
      <p className={`${'text text_type_main-medium'} mt-4 mb-8`}>
        {modalContent.name}
      </p>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2 `}
          >
            Калории, ккал
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {modalContent.calories}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2 `}
          >
            Белки, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {modalContent.proteins}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2`}
          >
            Жиры, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {modalContent.fat}
          </p>
        </li>
        <li className={styles.list_item}>
          <p
            className={`${'text text_type_main-default text_color_inactive'} pb-2`}
          >
            Углеводы, г
          </p>
          <p className={`${'text text_type_main-default text_color_inactive'}`}>
            {modalContent.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
