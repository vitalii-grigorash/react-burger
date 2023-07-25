import styles from './ingredient.module.css';
import { IIngredient } from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useEffect, useState } from 'react';
import { getConstructor } from '../../services/burger-constructor/selectors';
import { Link, useLocation } from 'react-router-dom';

interface IIngredientProps {
    ingredient: IIngredient;
}

function Ingredient(props: IIngredientProps): JSX.Element {

    const {
        ingredient,
    } = props;

    const location = useLocation();
    const { bun, ingredients } = useSelector(getConstructor);
    const [ingredientCount, setIngredientCount] = useState<number | null>(null);

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
            const allIngredients: IIngredient[] = [...ingredients];

            if (allIngredients.length !== 0) {
                const currentIngredient = allIngredients.filter(constructorIngredient => constructorIngredient._id === ingredient._id);
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

    return (
        <Link
            key={ingredient._id}
            to={`/ingredients/${ingredient._id}`}
            state={{ background: location }}
            ref={ref}
            className={styles[`${isDragging ? 'ingredient-dragging' : 'ingredient'}`]}
        >
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
        </Link>
    );
}

export default Ingredient;
