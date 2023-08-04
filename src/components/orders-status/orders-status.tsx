import styles from './orders-status.module.css';
import { IWSOrderFeedResponse } from '../../utils/types';
import { useEffect, useState } from 'react';

interface IOrderFeedProps {
    orders: IWSOrderFeedResponse | null;
}

function OrdersStatus(props: IOrderFeedProps): JSX.Element {

    const {
        orders
    } = props;

    const [ordersDoneFirstColumn, setOrdersDoneFirstColumn] = useState<string[]>([]);
    const [ordersDoneSecondColumn, setOrdersDoneSecondColumn] = useState<string[]>([]);
    const [ordersPendingFirstColumn, setOrdersPendingFirstColumn] = useState<string[]>([]);
    const [ordersPendingSecondColumn, setOrdersPendingSecondColumn] = useState<string[]>([]);

    useEffect(() => {
        const done: string[] = [];
        const pending: string[] = [];

        orders?.orders.forEach((order) => {
            if (order.status === 'done') {
                done.push(order.number.toString());
            }
            if (order.status === 'created' || order.status === 'pending') {
                pending.push(order.number.toString());
            }
        })

        if (done.length > 10) {
            setOrdersDoneFirstColumn(done.slice(0, 10));
            const otherNumbers = done.slice(10);
            if (otherNumbers.length > 10) {
                setOrdersDoneSecondColumn(otherNumbers.slice(0, 10));
            } else {
                setOrdersDoneSecondColumn(otherNumbers);
            }
        } else {
            setOrdersDoneFirstColumn(done);
        }

        if (pending.length > 10) {
            setOrdersPendingFirstColumn(pending.slice(0, 10));
            const otherNumbers = pending.slice(10);
            if (otherNumbers.length > 10) {
                setOrdersPendingSecondColumn(otherNumbers.slice(0, 10));
            } else {
                setOrdersPendingSecondColumn(otherNumbers);
            }
        } else {
            setOrdersPendingFirstColumn(pending);
        }

    }, [orders?.orders])

    return (
        <div className={styles['orders-status']}>
            <div className={styles['orders-status-container']}>
                <div className={styles['orders-status-info']}>
                    <h3 className={styles['heading']}>Готовы:</h3>
                    <div className={styles['orders-numbers-container']}>
                        <div className={styles['column-container']}>
                            {ordersDoneFirstColumn.map((number) => (
                                <p key={number} className={styles['orders-number-done']}>{number}</p>
                            ))}
                        </div>
                        {ordersDoneSecondColumn.length !== 0 && (
                            <div className={styles['column-container']}>
                                {ordersDoneSecondColumn.map((number) => (
                                    <p key={number} className={styles['orders-number-done']}>{number}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles['orders-status-info']}>
                    <h3 className={styles['heading']}>В работе:</h3>
                    <div className={styles['orders-numbers-container']}>
                        <div className={styles['column-container']}>
                            {ordersPendingFirstColumn.map((number) => (
                                <p key={number} className={styles['orders-number']}>{number}</p>
                            ))}
                        </div>
                        {ordersPendingSecondColumn.length !== 0 && (
                            <div className={styles['column-container']}>
                                {ordersDoneSecondColumn.map((number) => (
                                    <p key={number} className={styles['orders-number']}>{number}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles['total-container']}>
                <h3 className={styles['heading']}>Выполнено за все время:</h3>
                <p className={styles['total-value']}>{orders?.total}</p>
            </div>
            <div className={styles['total-container']}>
                <h3 className={styles['heading']}>Выполнено за сегодня:</h3>
                <p className={styles['total-value']}>{orders?.totalToday}</p>
            </div>
        </div>
    )
}

export default OrdersStatus;
