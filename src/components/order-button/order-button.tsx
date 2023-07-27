import styles from './order-button.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import currencyIcon from '../../images/currency-icon.svg';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getConstructor } from '../../services/burger-constructor/selectors';
import { getTotalPrice } from '../../services/total-price/selectors';
import { incrementPrice, resetPrice } from '../../services/total-price/actions';
import { errorOn } from '../../services/loading/actions';
import { showErrorDetails } from '../../services/modal/actions';
import { createOrder } from '../../services/order-details/actions';
import { getUser } from '../../services/user/selectors';
import { useNavigate } from 'react-router-dom';
import { IIngredient, IIngredientsId } from '../../utils/types';

function OrderButton(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { bun, ingredients } = useSelector(getConstructor);
    const { user } = useSelector(getUser);
    const { totalPrice } = useSelector(getTotalPrice);

    useEffect(() => {
        dispatch(resetPrice());
        const allPrices: number[] = [];
        if (ingredients.length !== 0) {
            ingredients.forEach((ingredient: IIngredient) => {
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
        if (bun && ingredients.length !== 0) {
            const ingredientsId: string[] = [];
            ingredients.forEach((ingredient: IIngredient) => {
                ingredientsId.push(ingredient._id);
            })
            ingredientsId.push(bun._id);
            const data: IIngredientsId = {
                ingredients: ingredientsId
            }
            if (user) {
                dispatch(createOrder(data));
            } else {
                navigate('/login');
            }
        } else {
            dispatch(errorOn(`${!bun ? 'Необходимо выбрать булку' : 'Необходимо добавить ингредиент'}`));
            dispatch(showErrorDetails('Ошибка оформления заказа'));
        }
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
