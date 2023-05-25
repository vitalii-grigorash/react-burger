import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';

function BurgerIngredients(props) {

    const {
        bun,
        sauce,
        topping
    } = props;

    const [current, setCurrent] = useState('one');

    // Какая-то логика в будущем при клике на вкладки
    function onBunTabClick() {
        setCurrent('one');
    }

    function onSauceTabClick() {
        setCurrent('two');
    }

    function onToppingTabClick() {
        setCurrent('three');
    }
    // ----------------------------------------------

    return (
        <section className={styles['burger-ingredients']}>
            <h1 className={styles.heading}>Соберите бургер</h1>
            <div style={{ display: 'flex', marginTop: 20 }}>
                <Tab value="one" active={current === 'one'} onClick={onBunTabClick}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={onSauceTabClick}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={onToppingTabClick}>
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

BurgerIngredients.propTypes = {
    bun: PropTypes.array,
    sauce: PropTypes.array,
    topping: PropTypes.array
};
