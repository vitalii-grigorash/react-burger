import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { ingredientsPropTypes } from '../../utils/types';
import currencyIcon from '../../images/currency-icon.svg';

function BurgerConstructor(props) {

    const {
        bun,
        sauce,
        topping
    } = props;

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedBun, setSelectedBun] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    // Пока на данном этапе у нас нет возможности выбрать bun или ингридиенты (как я понял)
    // Получаем первый[0] элемент массива bun
    // и все ингридиенты из data добавляем в массив для визуализации
    // потом внести тут изменения
    useEffect(() => {
        if (topping.length !== 0) {
            const allIngredients = sauce.concat(topping);
            setSelectedIngredients(allIngredients)
            setSelectedBun(bun[0]);
            // Складываем все цены выбранных ингридиентов в отдельный массив
            const allPrices = allIngredients.map(ingredient => ingredient.price);
            // Добавляем цену булок
            // Не знаю, это цена за одну булку или за пару, пока представим, что за пару
            allPrices.push(bun[0].price);
            // Суммируем все цены и кладем в переменную
            setTotalPrice(allPrices.reduce((a, b) => a + b));
        }
    }, [bun, sauce, topping])
    // ----------------------------------------------------------------------------------

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
                            <p className={styles['total-price']}>{totalPrice}</p>
                            <img className={styles['currency-icon']} src={currencyIcon} alt="Иконка большая" />
                        </div>
                        <Button htmlType="button" type="primary" size="large">
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
    bun: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    sauce: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    topping: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};
