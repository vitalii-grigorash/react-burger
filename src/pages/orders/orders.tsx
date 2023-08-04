import styles from './orders.module.css';
import Order from '../../components/order/order';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { connectProfile, disconnectProfile } from '../../services/ws-orders-profile/actions';
import { config } from '../../utils/config';
import { getWsOrdersProfile } from '../../services/ws-orders-profile/selectors';
import { IOrder } from '../../utils/types';
import { Outlet } from 'react-router-dom';

function Orders(): JSX.Element {

    const dispatch = useDispatch();

    const { orders } = useSelector(getWsOrdersProfile);
    const [ordersForRender, setOrdersForRender] = useState<IOrder[]>([]);

    useEffect(() => {
        const jwt = localStorage.getItem('accessToken');
        if (jwt) {
            const token = jwt.replace(/Bearer /g, '');
            dispatch(connectProfile(`${config.wsUrlProfile}?token=${token}`));
        }
        return () => dispatch(disconnectProfile());
    }, [dispatch])

    useEffect(() => {
        if (orders) {
            setOrdersForRender(orders.orders);
        }
    }, [orders])

    return (
        <section className={styles.orders}>
            {orders && (
                <>
                    {ordersForRender.map((order) => (
                        <Order
                            key={order._id}
                            orderDetails={order}
                            linkUrl={'profile/orders'}
                            background={'backgroundOrdersProfile'}
                        />
                    ))}
                </>
            )}
            <Outlet />
        </section>
    )
}

export default Orders;
