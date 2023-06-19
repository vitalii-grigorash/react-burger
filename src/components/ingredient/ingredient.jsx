import styles from './ingredient.module.css';
import { ingredientsPropTypes } from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredientDetails } from '../../services/modal/actions';
import { addIngredientDetails } from '../../services/ingredient-details/actions';
import { useDrag } from 'react-dnd';
import { useEffect, useState } from 'react';
import { getConstructor } from '../../services/burger-constructor/selectors';

function Ingredient(props) {

    const {
        ingredient,
    } = props;

    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(getConstructor);
    const [ingredientCount, setIngredientCount] = useState(null);

    useEffect(() => {
        if (ingredient.type === 'bun') {
            if (bun) {
                if (bun._id === ingredient._id) {
                    setIngredientCount(1);
                } else {
                    setIngredientCount(null);
                }
            } else {
                setIngredientCount(null);
            }
        } else {
            if (ingredients.length !== 0) {
                const currentIngredient = ingredients.filter(constructorIngredient => constructorIngredient._id === ingredient._id);
                if (currentIngredient.length !== 0) {
                    setIngredientCount(currentIngredient.length);
                } else {
                    setIngredientCount(null);
                }
            } else {
                setIngredientCount(null);
            }
        }
    }, [bun, ingredients, ingredient])

    const [{ isDragging }, ref] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    function onIngredientClick() {
        dispatch(addIngredientDetails(ingredient));
        dispatch(showIngredientDetails('Детали ингредиента'));
    }

    return (
        <section ref={ref} className={styles[`${isDragging ? 'ingredient-dragging' : 'ingredient'}`]} onClick={onIngredientClick}>
            {ingredientCount && (
                <div className={styles['counter-container']}>
                    <Counter count={ingredientCount} size="default" extraClass="m-0" />
                </div>
            )}
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
