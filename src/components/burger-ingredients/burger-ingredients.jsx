import { useState, useRef, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/selectors';

function BurgerIngredients() {

    const { ingredients } = useSelector(getIngredients);
    const [current, setCurrent] = useState('bun');

    const [bun, setBun] = useState([]);
    const [sauce, setSauce] = useState([]);
    const [topping, setTopping] = useState([]);

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const toppingRef = useRef(null);
    const tabsRef = useRef(null);

    useEffect(() => {
        
        const bunArr = [];
        const sauceArr = [];
        const toppingArr = [];

        ingredients.forEach((i) => {
            if (i.type === 'bun') {
                bunArr.push(i);
            } else if (i.type === 'sauce') {
                sauceArr.push(i);
            } else if (i.type === 'main') {
                toppingArr.push(i);
            }
        });

        setBun(bunArr);
        setSauce(sauceArr);
        setTopping(toppingArr);

    }, [ingredients])

    function onBunTabClick() {
        bunRef.current.scrollIntoView({ behavior: "smooth" });
    }

    function onSauceTabClick() {
        sauceRef.current.scrollIntoView({ behavior: "smooth" });
    }

    function onToppingTabClick() {
        toppingRef.current.scrollIntoView({ behavior: "smooth" });
    }

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
