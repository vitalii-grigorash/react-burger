import styles from './order-feed.module.css';
import Order from '../../components/order/order';
import OrdersStatus from '../../components/orders-status/orders-status';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { connect, disconnect } from '../../services/ws-orders/actions';
import { config } from '../../utils/config';
import { getWsOrders } from '../../services/ws-orders/selectors';
import { Outlet } from 'react-router-dom';

function OrderFeed(): JSX.Element {

    const dispatch = useDispatch();

    const { orders } = useSelector(getWsOrders);

    useEffect(() => {
        dispatch(connect(config.wsUrl));
        return () => dispatch(disconnect());
    }, [dispatch])

    return (
        <section className={styles['order-feed']}>
            <h2 className={styles.heading}>Лента заказов</h2>
            <div className={styles['main-container']}>
                <div className={styles['orders-container']}>
                    {orders && (
                        <>
                            {orders.orders.map((order) => (
                                <Order
                                    key={order._id}
                                    orderDetails={order}
                                    linkUrl={'feed'}
                                    background={'backgroundOrders'}
                                />
                            ))}
                        </>
                    )}
                </div>
                <OrdersStatus
                    orders={orders}
                />
            </div>
            <Outlet />
        </section>
    )
}

export default OrderFeed;
