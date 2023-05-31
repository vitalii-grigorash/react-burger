import styles from './ingredient-details.module.css';
import { ingredientsPropTypes } from '../../utils/types';

function IngredientDetails(props) {

    const {
        ingredient
    } = props;

    return (
        <div className={styles['ingredient-details']}>
            <img src={ingredient.image} alt="Изображение ингредиента" className={styles['ingredient-image']} />
            <p className={styles['ingredient-name']}>{ingredient.name}</p>
            <div className={styles['macronutrients-container']}>
                <div className={styles['nutrition-container']}>
                    <p className={styles['nutrition-heading']}>Калории, ккал</p>
                    <p className={styles['nutrition-value']}>{ingredient.calories}</p>
                </div>
                <div className={styles['nutrition-container']}>
                    <p className={styles['nutrition-heading']}>Белки, г</p>
                    <p className={styles['nutrition-value']}>{ingredient.proteins}</p>
                </div>
                <div className={styles['nutrition-container']}>
                    <p className={styles['nutrition-heading']}>Жиры, г</p>
                    <p className={styles['nutrition-value']}>{ingredient.fat}</p>
                </div>
                <div className={styles['nutrition-container']}>
                    <p className={styles['nutrition-heading']}>Углеводы, г</p>
                    <p className={styles['nutrition-value']}>{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
    ingredient: ingredientsPropTypes.isRequired
};
