import { useContext } from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { TotalPriceContext } from '../../services/totalPriceContext';
import currencyIcon from '../../images/currency-icon.svg';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/selectors';

function BurgerConstructor(props) {

    const {
        createNewOrder
    } = props;

    const ingredients = useSelector(getIngredients);

    const { priceState, priceDispatcher } = useContext(TotalPriceContext);

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedBun, setSelectedBun] = useState({});
    const [allPrices, setAllPrices] = useState([]);

    useEffect(() => {
        if (ingredients.length !== 0) {

            const allIngredients = ingredients.filter(ingredient => ingredient.type !== "bun")
            const allBuns = ingredients.filter(ingredient => ingredient.type === "bun")
            setSelectedIngredients(allIngredients)
            setSelectedBun(allBuns[0]);

            const pricesArr = allIngredients.map(ingredient => ingredient.price);

            pricesArr.push(allBuns[0].price);
            pricesArr.push(allBuns[0].price);

            setAllPrices(pricesArr);
        }
    }, [ingredients])

    useEffect(() => {
        priceDispatcher({ type: 'reset' });
        if (allPrices.length !== 0) {
            allPrices.forEach(price => {
                priceDispatcher({ type: 'increment', payload: price });
            })
        }
    }, [allPrices, priceDispatcher])

    function onOrderButtonClick() {
        const allIngredientsId = selectedIngredients.map(ingredient => ingredient._id);
        allIngredientsId.push(selectedBun._id);
        allIngredientsId.push(selectedBun._id);

        const data = {
            ingredients: allIngredientsId
        }

        createNewOrder(data);
    }

    return (
        <section className={styles['burger-constructor']}>
            {selectedIngredients.length !== 0 && (
                <>
                    <div className={styles['bun-container']}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${selectedBun.name} (верх)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}
                        />
                    </div>
                    <ul className={styles['constructor-container']}>
                        {selectedIngredients.map((item) => (
                            <li key={item._id} className={styles['topping-container']}>
                                <DragIcon type="primary" />
                                <div className={styles['item-container']}>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['bun-container']}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${selectedBun.name} (низ)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}
                        />
                    </div>
                    <div className={styles['button-container']}>
                        <div className={styles['total-price-container']}>
                            <p className={styles['total-price']}>{priceState.price}</p>
                            <img className={styles['currency-icon']} src={currencyIcon} alt="Иконка большая" />
                        </div>
                        <Button htmlType="button" type="primary" size="large" onClick={onOrderButtonClick}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    createNewOrder: PropTypes.func
};
