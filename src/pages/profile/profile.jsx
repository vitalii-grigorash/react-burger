import styles from './profile.module.css';
import { logout } from '../../services/user/actions';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useMatch } from 'react-router-dom';

function Profile() {

    const dispatch = useDispatch();

    const isUserActive = useMatch('/profile');
    const isOrdersActive = useMatch('/profile/orders');

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <section className={styles.profile}>
            <div className={styles['nav-container']}>
                <div className={styles['link-container']}>
                    <Link to='/profile' className={`${isUserActive ? styles['link-active'] : styles.link}`}>
                        Профиль
                    </Link>
                </div>
                <div className={styles['link-container']}>
                    <Link to='orders' className={`${isOrdersActive ? styles['link-active'] : styles.link}`}>
                        История заказов
                    </Link>
                </div>
                <div className={styles['link-container']}>
                    <p className={styles.link} onClick={handleLogout}>
                        Выход
                    </p>
                </div>
                <p className={styles.description}>
                    {isUserActive ?
                        'В этом разделе вы можете изменить свои персональные данные' :
                        'В этом разделе вы можете просмотреть свою историю заказов'
                    }
                </p>
            </div>
            <Outlet />
        </section>
    )
}

export default Profile;
