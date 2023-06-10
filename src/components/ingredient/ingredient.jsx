import styles from './ingredient.module.css';
import { ingredientsPropTypes } from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { showIngredientDetails } from '../../services/modal/actions';
import { addIngredientDetails } from '../../services/ingredient-details/actions';

function Ingredient(props) {

    const {
        ingredient,
    } = props;

    const dispatch = useDispatch();

    function onIngredientClick() {
        dispatch(addIngredientDetails(ingredient));
        dispatch(showIngredientDetails('Детали ингредиента'));
    }

    return (
        <section className={styles.ingredient} onClick={onIngredientClick}>
            <div className={styles['counter-container']}>
                <Counter count={1} size="default" extraClass="m-0" />
            </div>
            <img className={styles.picture} src={ingredient.image} alt="icon" />
            <div className={styles['price-container']}>
                <p className={styles.price}>{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles['item-name']}>{ingredient.name}</p>
        </section>
    );
}

export default Ingredient;

Ingredient.propTypes = {
    ingredient: ingredientsPropTypes.isRequired
};
