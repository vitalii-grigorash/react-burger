import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import styles from './order-feed-details.module.css';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/order-details/actions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { IIngredient, IDate } from '../../utils/types';
import { getModal } from '../../services/modal/selectors';
import { converDate } from '../../utils/convert-date';

function OrderFeedDetails() {

    const { number } = useParams();
    const dispatch = useDispatch();

    const { isOrderFeedModalOpen } = useSelector(getModal);
    const { ingredients } = useSelector(getIngredients);

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderIngredients, setOrderIngredients] = useState<IIngredient[]>([]);
    const [date, setDate] = useState<IDate>();

    const order = useSelector(store => {
        let order = store.wsOrders.orders && store.wsOrders.orders.orders.find((el) => el.number.toString() === number);
        if (order) {
            return order;
        }
        order = store.wsOrdersProfile.orders && store.wsOrdersProfile.orders.orders.find((el) => el.number.toString() === number);
        if (order) {
            return order;
        }
        return order = store.orderDetails.order?.number.toString() === number ? store.orderDetails.order : null;
    })

    const addIngredientsForRender = useCallback((allOrderIngredients: IIngredient[]) => {
        let ingredientsForRender: IIngredient[] = [];
        allOrderIngredients.forEach((ingredient) => {
            if (ingredientsForRender.length === 0) {
                ingredient.count = 1
                ingredientsForRender.push(ingredient);
            } else {
                const foundIngredient = ingredientsForRender.find(el => el._id === ingredient._id);
                if (foundIngredient === undefined) {
                    ingredient.count = 1
                    ingredientsForRender.push(ingredient);
                } else {
                    const filteredIngredients = ingredientsForRender.filter(el => el._id !== ingredient._id);
                    if (foundIngredient.count !== undefined) {
                        foundIngredient.count++
                        filteredIngredients.push(foundIngredient);
                        ingredientsForRender = filteredIngredients
                    }
                }
            }
        })
        setOrderIngredients(ingredientsForRender.reverse());
    }, [])

    useEffect(() => {
        if (!order) {
            if (number) {
                dispatch(getOrder(number));
            }
        } else {
            const allOrderIngredients: IIngredient[] = [];
            let price: number = 0
            order.ingredients.forEach((id) => {
                ingredients.forEach((ingredient) => {
                    if (id === ingredient._id) {
                        allOrderIngredients.push(ingredient);
                        price = price + ingredient.price;
                    }
                })
            })
            setTotalPrice(price);
            setDate(converDate(order));
            addIngredientsForRender(allOrderIngredients);
        }
    }, [dispatch, number, order, ingredients, addIngredientsForRender]);

    return (
        <>
            {order ? (
                <div className={styles['order-feed-details']}>
                    <p className={!isOrderFeedModalOpen ? styles['order-number-page'] : styles['order-number']}>#{order.number}</p>
                    <h3 className={styles['order-name']}>{order.name}</h3>
                    <p className={
                        order.status === 'done' ?
                            styles['order-status-done'] :
                            styles['order-status']
                    }>
                        {order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : 'Выполнен'}
                    </p>
                    <p className={styles['order-list']}>Состав:</p>
                    <div className={styles['order-list-container']}>
                        {orderIngredients.map((ingredient) => (
                            <div key={ingredient._id} className={styles['order-container']}>
                                <div className={styles['images-container']}>
                                    <img className={styles['ingeredient-img']} src={ingredient.image_mobile} alt="Изображение ингредиента" />
                                </div>
                                <p className={styles['ingeredient-name']}>{ingredient.name}</p>
                                <div className={styles['price-container']}>
                                    <p className={styles['ingeredient-price']}>{ingredient.count} x {ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles['bottom-container']}>
                        <p className={styles['order-date']}>{date && date.day}, {date && date.time}</p>
                        <div className={styles['price-container']}>
                            <p className={styles['ingeredient-price']}>{totalPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles['order-feed-details']}>
                    <h2>Заказ не найден</h2>
                </div>
            )}
        </>
    );
}

export default OrderFeedDetails;
