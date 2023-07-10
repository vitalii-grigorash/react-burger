import styles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMatch, useNavigate } from 'react-router-dom';

function NotFound() {

    const navigate = useNavigate();
    const isProfilePage = useMatch('/profile/*');

    function onMainPageClick () {
        navigate('/');
    }

    return (
        <section className={styles[`${isProfilePage ? 'not-found-profile' : 'not-found'}`]}>
            <h1 className={styles.heading}>Страница не найдена</h1>
            <Button htmlType="button" type="primary" size="medium" onClick={onMainPageClick}>
                На главную
            </Button>
        </section>
    )
}

export default NotFound;
