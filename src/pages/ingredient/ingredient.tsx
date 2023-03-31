import styles from './styles.module.scss';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

function Ingredient() {
  return (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
}

export default Ingredient;
