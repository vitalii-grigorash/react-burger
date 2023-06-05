import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { IngredientsContext } from '../../services/ingredientsContext';
import { TotalPriceContext } from '../../services/totalPriceContext';
import currencyIcon from '../../images/currency-icon.svg';

function BurgerConstructor(props) {

    const {
        createNewOrder
    } = props;

    const ingredients = useContext(IngredientsContext);

    const { priceState, priceDispatcher } = useContext(TotalPriceContext);

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedBun, setSelectedBun] = useState({});
    const [allPrices, setAllPrices] = useState([]);

    // Пока на данном этапе у нас нет возможности выбрать bun или ингридиенты (как я понял)
    // Получаем первый[0] элемент массива bun
    // и все ингридиенты из ingredients добавляем в массив для визуализации
    // потом внести тут изменения когда появится DnD и Redux

    useEffect(() => {
        if (ingredients.length !== 0) {

            // Отделяем булки от остальных ингредиентов
            const allIngredients = ingredients.filter(ingredient => ingredient.type !== "bun")
            const allBuns = ingredients.filter(ingredient => ingredient.type === "bun")
            setSelectedIngredients(allIngredients)
            setSelectedBun(allBuns[0]);

            // Складываем все цены выбранных ингридиентов в отдельный массив
            const pricesArr = allIngredients.map(ingredient => ingredient.price);

            // Добавляем цены двух булок (верх и низ)
            pricesArr.push(allBuns[0].price);
            pricesArr.push(allBuns[0].price);

            setAllPrices(pricesArr);
        }
    }, [ingredients])
    // ----------------------------------------------------------------------------------

    // Пока у нас нет логики добавлять и удалять ингредиенты по одному
    // Поэтому методом forEach пройдёмся по всему массиву ингридиентов и подсчитаем общую стоимотсть
    // Внести тут изменения, когда появится DnD и Redux
    useEffect(() => {
        // При ререндере компонента сбрасываем стейт, что бы корректо считалось
        priceDispatcher({ type: 'reset' });
        if (allPrices.length !== 0) {
            allPrices.forEach(price => {
                // Вызываем priceDispatcher для каждого элемента массива
                priceDispatcher({ type: 'increment', payload: price });
            })
        }
    }, [allPrices, priceDispatcher])

    function onOrderButtonClick() {
        // Дабавляем массив из _id выбранных ингредиентов
        const allIngredientsId = selectedIngredients.map(ingredient => ingredient._id);
        // Пока не понятно, надо ли добавлять два одинаковых _id булок в запрос или достаточно одного
        // Пока добавим один _id
        allIngredientsId.push(selectedBun._id);

        const data = {
            ingredients: allIngredientsId
        }

        createNewOrder(data);
    }

    return (
        <section className={styles['burger-constructor']}>
            {/* Если данные не успели подготовиться, делаем проверку, что бы не сломалось */}
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
                    {/* Возможно, есть смысл вынести в отдельный копонент */}
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
                    {/* ------------------------------------------------- */}
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
