import { useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/selectors';

function BurgerIngredients() {

    const { bun, sauce, topping } = useSelector(getIngredients);
    const [current, setCurrent] = useState('bun');

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const toppingRef = useRef(null);
    const tabsRef = useRef(null);

    function getDiff(a, b) {
        return Math.abs(a - b);
    }

    const handleScroll = () => {
        const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;
        const bunTop = bunRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current.getBoundingClientRect().top;
        const toppingTop = toppingRef.current.getBoundingClientRect().top;

        const bunDiff = getDiff(tabsBottom, bunTop);
        const sauceDiff = getDiff(tabsBottom, sauceTop);
        const toppingDiff = getDiff(tabsBottom, toppingTop);

        if (bunDiff < sauceDiff && bunDiff < toppingDiff) {
            setCurrent('bun');
        } else if (sauceDiff < bunDiff && sauceDiff < toppingDiff) {
            setCurrent('sauce');
        } else if (toppingDiff < bunDiff && toppingDiff < sauceDiff) {
            setCurrent('topping');
        }
    }

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className={styles.heading}>Соберите бургер</h1>
            <div ref={tabsRef} className={styles['tabs-container']}>
                <Tab value="bun" active={current === 'bun'}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'}>
                    Соусы
                </Tab>
                <Tab value="topping" active={current === 'topping'}>
                    Начинки
                </Tab>
            </div>
            <div id='scroll' onScroll={handleScroll} className={styles['ingredients-main-container']}>
                <Ingredients
                    heading='Булки'
                    data={bun}
                    ref={bunRef}
                />
                <Ingredients
                    heading='Соусы'
                    data={sauce}
                    ref={sauceRef}
                />
                <Ingredients
                    heading='Начинки'
                    data={topping}
                    ref={toppingRef}
                />
            </div>
        </section>
    );
}

export default BurgerIngredients;
