import { useState, useRef, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { IIngredient } from '../../utils/types';

function BurgerIngredients(): JSX.Element {

    const { ingredients } = useSelector(getIngredients);
    const [current, setCurrent] = useState<'bun' | 'sauce' | 'topping'>('bun');

    const [bun, setBun] = useState<IIngredient[]>([]);
    const [sauce, setSauce] = useState<IIngredient[]>([]);
    const [topping, setTopping] = useState<IIngredient[]>([]);

    const bunRef = useRef<HTMLDivElement | null>(null);
    const sauceRef = useRef<HTMLDivElement | null>(null);
    const toppingRef = useRef<HTMLDivElement | null>(null);
    const tabsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const bunArr: IIngredient[] = [];
        const sauceArr: IIngredient[] = [];
        const toppingArr: IIngredient[] = [];

        ingredients.forEach((i: IIngredient) => {
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
        bunRef.current && bunRef.current.scrollIntoView({ behavior: "smooth" });
    }

    function onSauceTabClick() {
        sauceRef.current && sauceRef.current.scrollIntoView({ behavior: "smooth" });
    }

    function onToppingTabClick() {
        toppingRef.current && toppingRef.current.scrollIntoView({ behavior: "smooth" });
    }

    function getDiff(a: number | null, b: number | null): number | null {
        if (a && b) {
            return Math.abs(a - b);
        } else {
            return null
        }
    }

    const handleScroll = () => {
        const tabsBottom = tabsRef.current && tabsRef.current.getBoundingClientRect().bottom;
        const bunTop = bunRef.current && bunRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current && sauceRef.current.getBoundingClientRect().top;
        const toppingTop = toppingRef.current && toppingRef.current.getBoundingClientRect().top;

        const bunDiff = getDiff(tabsBottom, bunTop);
        const sauceDiff = getDiff(tabsBottom, sauceTop);
        const toppingDiff = getDiff(tabsBottom, toppingTop);

        if (bunDiff && sauceDiff && toppingDiff) {
            if (bunDiff < sauceDiff && bunDiff < toppingDiff) {
                setCurrent('bun');
            } else if (sauceDiff < bunDiff && sauceDiff < toppingDiff) {
                setCurrent('sauce');
            } else if (toppingDiff < bunDiff && toppingDiff < sauceDiff) {
                setCurrent('topping');
            }
        } else {
            setCurrent('bun');
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
