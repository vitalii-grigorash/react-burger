import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { IngredientsContext } from '../../services/ingredientsContext';

function BurgerIngredients(props) {

    const {
        openModal
    } = props;

    const ingredients = useContext(IngredientsContext);
    const [bun, setBun] = useState([]);
    const [sauce, setSauce] = useState([]);
    const [topping, setTopping] = useState([]);
    const [current, setCurrent] = useState('bun');

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
            <div style={{ display: 'flex', marginTop: 20 }}>
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
                    openModal={openModal}
                />
                <Ingredients
                    heading='Соусы'
                    data={sauce}
                    openModal={openModal}
                />
                <Ingredients
                    heading='Начинки'
                    data={topping}
                    openModal={openModal}
                />
            </div>
        </section>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    openModal: PropTypes.func
};
