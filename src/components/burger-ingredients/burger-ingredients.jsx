import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { ingredientsPropTypes } from '../../utils/types';

function BurgerIngredients(props) {

    const {
        bun,
        sauce,
        topping,
        openModal
    } = props;

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
    bun: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    sauce: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    topping: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    openModal: PropTypes.func
};
