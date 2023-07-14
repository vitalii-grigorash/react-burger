import styles from './form-container.module.css';
import { Link, useMatch } from 'react-router-dom';

interface IFormContainerProps {
    children: React.ReactNode;
    heading: string;
    linkText: string;
}

function FormContainer(props: IFormContainerProps) {

    const {
        children,
        heading,
        linkText
    } = props;

    const isLoginPage = useMatch('/login');

    return (
        <section className={styles['form-container']}>
            <h2 className={styles['form-heading']}>{heading}</h2>
            {children}
            {isLoginPage ? (
                <>
                    <div className={styles['form-change-container']}>
                        <p className={styles['form-change-text']}>Вы - новый пользователь?</p>
                        <Link to='/register' className={styles['form-change-link']}>Зарегистрироваться</Link>
                    </div>
                    <div className={styles['form-change-container']}>
                        <p className={styles['form-change-text']}>Забыли пароль?</p>
                        <Link to='/forgot-password' className={styles['form-change-link']}>Восстановить пароль</Link>
                    </div>
                </>
            ) : (
                <div className={styles['form-change-container']}>
                    <p className={styles['form-change-text']}>{linkText}</p>
                    <Link to='/login' className={styles['form-change-link']}>Войти</Link>
                </div>
            )}
        </section>
    )
}

export default FormContainer;
