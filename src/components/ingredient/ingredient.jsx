import styles from './ingredient.module.css';
import { ingredientsPropTypes } from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Ingredient(props) {

    const {
        item,
        openModal
    } = props;

    function showIngredientDetails() {
        openModal(false, item);
    }

    return (
        <section className={styles.ingredient} onClick={showIngredientDetails}>
            <div className={styles['counter-container']}>
                <Counter count={1} size="default" extraClass="m-0" />
            </div>
            <img className={styles.picture} src={item.image} alt="icon" />
            <div className={styles['price-container']}>
                <p className={styles.price}>{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles['item-name']}>{item.name}</p>
        </section>
    );
}

export default Ingredient;

Ingredient.propTypes = {
    item: ingredientsPropTypes.isRequired,
    openModal: PropTypes.func
};
