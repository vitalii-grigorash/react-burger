import { useCallback, useEffect, useState } from 'react';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { IOrderFeed, IIngredient } from '../../utils/types';
import { useMatch } from 'react-router-dom';

interface IOrderProps {
    orderDetails: IOrderFeed;
}

function Order(props: IOrderProps): JSX.Element {

    const {
        orderDetails
    } = props;

    const { ingredients } = useSelector(getIngredients);

    const matchPattern = useMatch('/profile/orders');

    const [ingredientsForRender, setIngredientsForRender] = useState<IIngredient[]>([]);
    const [otherIngredients, setOtherIngredients] = useState<IIngredient[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [createdAtDay, setCreatedAtDay] = useState<string>('');
    const [createdAtTime, setCreatedAtTime] = useState<string>('');

    const converDate = useCallback(() => {

        const dateNow = new Date();
        const createdAt = new Date(orderDetails.createdAt);

        const timeDiff = Math.abs(dateNow.getTime() - createdAt.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)).toString();
        const lastChar = diffDays.charAt(diffDays.length - 1);

        setCreatedAtTime(createdAt.toLocaleTimeString().slice(0, -3));

        if (diffDays === '1') {
            setCreatedAtDay('Сегодня');
        } else if (diffDays === '2') {
            setCreatedAtDay('Вчера');
        } else if (lastChar === "1" && diffDays !== '11') {
            setCreatedAtDay(`${diffDays} день назад`);
        } else if (lastChar === "2" && diffDays !== '12') {
            setCreatedAtDay(`${diffDays} дня назад`);
        } else if (lastChar === "3" && diffDays !== '13') {
            setCreatedAtDay(`${diffDays} дня назад`);
        } else if (lastChar === "4" && diffDays !== '14') {
            setCreatedAtDay(`${diffDays} дня назад`);
        } else {
            setCreatedAtDay(`${diffDays} дней назад`);
        }

    }, [orderDetails.createdAt])

    useEffect(() => {

        const allOrderIngredients: IIngredient[] = [];
        let price: number = 0

        orderDetails.ingredients.forEach((id) => {
            ingredients.forEach((ingredient) => {
                if (id === ingredient._id) {
                    allOrderIngredients.push(ingredient);
                    price = price + ingredient.price
                }
            })
        })

        setTotalPrice(price);

        if (allOrderIngredients.length > 6) {
            setIngredientsForRender(allOrderIngredients.slice(0, 6));
            setOtherIngredients(allOrderIngredients.slice(6));
        } else {
            setIngredientsForRender(allOrderIngredients);
            setOtherIngredients([]);
        }

        converDate();

    }, [ingredients, orderDetails, converDate])

    return (
        <div className={styles.order}>
            <div className={styles['header-container']}>
                <p className={styles['order-number']}>#{orderDetails.number}</p>
                <p className={styles['created-date']}>{createdAtDay}, {createdAtTime}</p>
            </div>
            <p className={styles['order-name']}>{orderDetails.name}</p>
            {matchPattern && (
                <p className={
                    orderDetails.status === 'done' ?
                        styles['order-status-done'] :
                        styles['order-status']
                }>
                    {orderDetails.status === 'created' ? 'Создан' : orderDetails.status === 'pending' ? 'Готовится' : 'Выполнен'}
                </p>
            )}
            <div className={styles['bottom-container']}>
                <div className={styles['images-container']}>
                    {ingredientsForRender.map((ingredient, index) => (
                        <div key={index} className={styles['image-container']} style={{ zIndex: ingredientsForRender.length - index }}>
                            {otherIngredients.length !== 0 && (
                                <div className={styles['ingredient-value-container']}>
                                    <p className={styles['ingredient-value']}>+ {otherIngredients.length}</p>
                                </div>
                            )}
                            <img className={styles.image} src={ingredient.image_mobile} alt="Изображение ингредиента" />
                        </div>
                    ))}
                </div>
                <div className={styles['total-price-container']}>
                    <p className={styles['total-price']}>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default Order;
