import styles from './burger-constructor.module.css';
import update from "immutability-helper";
import BunConstructor from '../bun-constructor/bun-constructor';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import OrderButton from '../order-button/order-button';
import { useDispatch, useSelector } from '../../utils/hooks';
import { useDrop } from 'react-dnd';
import { selectBun, addIngredient, sortIngredients } from '../../services/burger-constructor/actions';
import { getConstructor } from '../../services/burger-constructor/selectors';
import uniqid from 'uniqid';
import { useCallback } from 'react';
import { IIngredient } from '../../utils/types';

function BurgerConstructor(): JSX.Element {

    const dispatch = useDispatch();

    const { ingredients } = useSelector(getConstructor);

    function addNewIngredient(ingredient: IIngredient) {
        ingredient.uniqKey = uniqid();
        if (ingredient.type === 'bun') {
            dispatch(selectBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    }

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredient: IIngredient) {
            addNewIngredient({ ...ingredient });
        },
    });

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        const sortedIngredients = (): IIngredient[] => update(ingredients, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, ingredients[dragIndex]]
            ]
        })
        const newSortedIngredients: IIngredient[] = sortedIngredients();
        dispatch(sortIngredients(newSortedIngredients));
    }, [dispatch, ingredients]);

    return (
        <section ref={dropRef} className={styles['burger-constructor']}>
            <BunConstructor
                type="top"
                text="(верх)"
            />
            <div className={styles[`${ingredients.length !== 0 ? 'constructor-container' : 'constructor-default-container'}`]}>
                {ingredients.length !== 0 ? (
                    <>
                        {
                            ingredients.map((ingredient: IIngredient, index: number) => (
                                <IngredientConstructor
                                    key={ingredient.uniqKey}
                                    ingredient={ingredient}
                                    index={index}
                                    moveCard={moveCard}
                                    uniqKey={ingredient.uniqKey}
                                />
                            ))
                        }
                    </>
                ) : (
                    <div className={styles['default-container']}>
                        <p className={styles['default-container-text']}>Добавьте ингредиент</p>
                    </div>
                )}
            </div>
            <BunConstructor
                type="bottom"
                text="(низ)"
            />
            <OrderButton />
        </section>
    );
}

export default BurgerConstructor;
