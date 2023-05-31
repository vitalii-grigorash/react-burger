import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import { ingredientsPropTypes } from '../../utils/types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main (props) {

    const {
        ingredients,
        openModal
    } = props;

    const [bun, setBun] = useState([]);
    const [sauce, setSauce] = useState([]);
    const [topping, setTopping] = useState([]);

    // Разбиваем исходный массив на разные по типам
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

    return (
        <main className={styles.main}>
            <BurgerIngredients
                bun={bun}
                sauce={sauce}
                topping={topping}
                openModal={openModal}
            />
            <BurgerConstructor
                bun={bun}
                sauce={sauce}
                topping={topping}
                openModal={openModal}
            />
        </main>
    );
}

export default Main;

Main.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    openModal: PropTypes.func
};
