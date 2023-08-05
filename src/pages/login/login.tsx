import styles from './login.module.css';
import React, { useState } from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../utils/hooks';
import { login } from '../../services/user/actions';
import { TLogin } from '../../utils/types';

function Login(): JSX.Element {

    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    }

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data: TLogin = {
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
