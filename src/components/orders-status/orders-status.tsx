import styles from './orders-status.module.css';

function OrdersStatus(): JSX.Element {

    return (
        <div className={styles['orders-status']}>
            <h2 className={styles['orders-heading']}>Заказы</h2>
        </div>
    )
}

export default OrdersStatus;
