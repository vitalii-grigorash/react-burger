import { useContext } from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../images/done-icon.svg';
import { OrderNumberContext } from '../../services/orderNumberContext';

function OrderDetails() {

    const number = useContext(OrderNumberContext);

    return (
        <div className={styles['order-details']}>
            <p className={styles['order-number']}>{number}</p>
            <p className={styles['identifier-text']}>идентификатор заказа</p>
            <img src={doneIcon} alt="Иконка созданного заказа" className={styles['done-icon']} />
            <p className={styles['start-text']}>Ваш заказ начали готовить</p>
            <p className={styles['waiting-text']}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;
