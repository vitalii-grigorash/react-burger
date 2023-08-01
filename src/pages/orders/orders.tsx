import styles from './orders.module.css';
import Order from '../../components/order/order';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { WsConnectProfile, WsDisconnectProfile } from '../../services/ws-orders-profile/actions';
import { config } from '../../utils/config';
import { getWsOrdersProfile } from '../../services/ws-orders-profile/selectors';

function Orders(): JSX.Element {

    const dispatch = useDispatch();

    const { orders } = useSelector(getWsOrdersProfile);

    useEffect(() => {
        const jwt = localStorage.getItem('accessToken');
        if (jwt) {
            const token = jwt.replace(/Bearer /g, '');
            dispatch(WsConnectProfile(`${config.wsUrlProfile}?token=${token}`));
        }
        return () => dispatch(WsDisconnectProfile());
    }, [dispatch])

    return (
        <section className={styles.orders}>
            {orders && (
                <>
                    {orders.orders.map((order) => (
                        <Order
                            key={order._id}
                            orderDetails={order}
                        />
                    ))}
                </>
            )}
        </section>
    )
}

export default Orders;
