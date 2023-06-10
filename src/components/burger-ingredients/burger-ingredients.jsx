import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/selectors';

function BurgerIngredients() {

    const { bun, sauce, topping } = useSelector(getIngredients);
    const [current, setCurrent] = useState('bun');

    // Какая-то логика в будущем при клике на вкладки
    function onBunTabClick() {
        setCurrent('bun');
    }

    function onSauceTabClick() {
        setCurrent('sauce');
    }

    function onToppingTabClick() {
        setCurrent('topping');
    }
    // ----------------------------------------------

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className={styles.heading}>Соберите бургер</h1>
            <div className={styles['tabs-container']}>
                <Tab value="bun" active={current === 'bun'} onClick={onBunTabClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={onSauceTabClick}>
                    Соусы
                </Tab>
                <Tab value="topping" active={current === 'topping'} onClick={onToppingTabClick}>
                    Начинки
                </Tab>
            </div>
            <div className={styles['ingredients-main-container']}>
                <Ingredients
                    heading='Булки'
                    data={bun}
                />
                <Ingredients
                    heading='Соусы'
                    data={sauce}
                />
                <Ingredients
                    heading='Начинки'
                    data={topping}
                />
            </div>
        </section>
    );
}

export default BurgerIngredients;
