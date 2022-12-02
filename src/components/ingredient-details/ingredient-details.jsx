import dataPropTypes from '../../utils/types';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({currentIngredient}) => {

  return (
    <div className={"mt-8 " + styles.details}>
      <img src={currentIngredient.image_large} alt="ingredient" />
      <p className={"mb-8 text text_type_main-medium " + styles.text}>{currentIngredient.name}</p>
      <div className={"mb-15 " + styles.substance} >
        <div className={"mr-5 " + styles.substance__item}>
          <p className={"text text_type_main-default text_color_inactive " + styles.item_text}>Калории,ккал</p>
          <p className={"text text_type_digits-default text_color_inactive " + styles.item_text}>{currentIngredient.calories}</p>
        </div>

        <div className={"mr-5 " + styles.substance__item}>
          <p className={"text text_type_main-default text_color_inactive " + styles.item_text}>Белки, г</p>
          <p className={"text text_type_digits-default text_color_inactive " + styles.item_text}>{currentIngredient.proteins}</p>
        </div>

        <div className={"mr-5 " + styles.substance__item}>
          <p className={"text text_type_main-default text_color_inactive " + styles.item_text}>Жиры, г</p>
          <p className={"text text_type_digits-default text_color_inactive " + styles.item_text}>{currentIngredient.fat}</p>
        </div>

        <div className={styles.substance__item}>
          <p className={"text text_type_main-default text_color_inactive " + styles.item_text}>Углеводы, г</p>
          <p className={"text text_type_digits-default text_color_inactive " + styles.item_text}>{currentIngredient.carbohydrates}</p>
        </div>

      </div>
    </div>
  )
};

IngredientDetails.propTypes = { 
  currentIngredient: PropTypes.shape(
      dataPropTypes.isRequired).isRequired
};

export default IngredientDetails;