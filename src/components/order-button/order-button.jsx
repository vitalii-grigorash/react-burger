import styles from './order-button.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import currencyIcon from '../../images/currency-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getConstructor } from '../../services/burger-constructor/selectors';
import { getTotalPrice } from '../../services/total-price/selectors';
import { incrementPrice, resetPrice } from '../../services/total-price/actions';
import { createOrder } from '../../services/order-details/actions';

function OrderButton() {

    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(getConstructor);

    const { totalPrice } = useSelector(getTotalPrice);

    useEffect(() => {
        dispatch(resetPrice());
        const allPrices = [];
        if (ingredients.length !== 0) {
            ingredients.forEach((ingredient) => {
                allPrices.push(ingredient.price);
            })
        }
        if (bun) {
            allPrices.push(bun.price * 2);
        }
        if (allPrices.length !== 0) {
            allPrices.forEach(price => {
                dispatch(incrementPrice(price));
            })
        }
    }, [bun, ingredients, dispatch])

    function onOrderButtonClick() {
        const ingredientsId = [];
        if (ingredients.length !== 0) {
            ingredients.forEach((ingredient) => {
                ingredientsId.push(ingredient._id);
            })
        }
        if (bun) {
            ingredientsId.push(bun._id);
        }
        const data = {
            ingredients: ingredientsId
        }
        dispatch(createOrder(data));
    }

    return (
        <div className={styles['order-button']}>
            <div className={styles['total-price-container']}>
                <p className={styles['total-price']}>{totalPrice}</p>
                <img className={styles['currency-icon']} src={currencyIcon} alt="Иконка большая" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={onOrderButtonClick}>
                Оформить заказ
            </Button>
        </div>
    );
}

export default OrderButton;
