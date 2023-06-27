import styles from './login.module.css';
import { useState } from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { login } from '../../services/user/actions';

function Login() {

    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onEmailChange = e => {
        setEmailValue(e.target.value);
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();

        const data = {
            email: emailValue,
            password: passwordValue,
        }

        dispatch(login(data));
    }

    return (
        <form onSubmit={handleLogin} className={styles.login}>
            <div className={styles['input-container']}>
                <EmailInput
                    onChange={onEmailChange}
                    value={emailValue}
                    name={'email'}
                    isIcon={false}
                />
            </div>
            <div className={styles['input-container']}>
                <PasswordInput
                    onChange={onPasswordChange}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <Button htmlType="submit" type="primary" size="large">
                Войти
            </Button>
        </form>
    )
}

export default Login;
