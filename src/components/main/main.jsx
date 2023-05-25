import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data } from '../../utils/data';
import { useEffect, useState } from 'react';

function Main() {

    const [bun, setBun] = useState([]);
    const [sauce, setSauce] = useState([]);
    const [topping, setTopping] = useState([]);

    // Разбиваем исходный массив на разные по типам
    useEffect(() => {

        const bunArr = [];
        const sauceArr = [];
        const toppingArr = [];

        data.forEach((i) => {
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

    }, [])

    return (
        <main className={styles.main}>
            <BurgerIngredients
                bun={bun}
                sauce={sauce}
                topping={topping}
            />
            <BurgerConstructor
                bun={bun}
                sauce={sauce}
                topping={topping}
            />
        </main>
    );
}

export default Main;
