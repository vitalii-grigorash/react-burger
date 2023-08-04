import { useEffect, useState } from 'react';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { IOrder, IIngredient, IDate } from '../../utils/types';
import { useMatch, Link, useLocation } from 'react-router-dom';
import { addOrderDetails } from '../../services/order-details/actions';
import { converDate } from '../../utils/convert-date';

interface IOrderProps {
    orderDetails: IOrder;
    linkUrl: string;
    background: string;
}

function Order(props: IOrderProps): JSX.Element {

    const {
        orderDetails,
        linkUrl,
        background
    } = props;

    const { ingredients } = useSelector(getIngredients);

    const location = useLocation();
    const matchPattern = useMatch('/profile/orders');
    const dispatch = useDispatch();

    const [ingredientsForRender, setIngredientsForRender] = useState<IIngredient[]>([]);
    const [otherIngredients, setOtherIngredients] = useState<IIngredient[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [date, setDate] = useState<IDate>();

    useEffect(() => {
        const allOrderIngredients: IIngredient[] = [];
        let price: number = 0
        orderDetails.ingredients.forEach((id) => {
            ingredients.forEach((ingredient) => {
                if (id === ingredient._id) {
                    allOrderIngredients.push(ingredient);
                    price = price + ingredient.price;
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
        setDate(converDate(orderDetails));
    }, [ingredients, orderDetails])

    function onOrderClick() {
        dispatch(addOrderDetails(orderDetails));
    }

    return (
        <Link
            key={orderDetails._id}
            to={`/${linkUrl}/${orderDetails.number}`}
            state={{ [background]: location }}
            className={styles.order}
            onClick={onOrderClick}
        >
            <div className={styles['header-container']}>
                <p className={styles['order-number']}>#{orderDetails.number}</p>
                <p className={styles['created-date']}>{date && date.day}, {date && date.time}</p>
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
        </Link>
    )
}

export default Order;
