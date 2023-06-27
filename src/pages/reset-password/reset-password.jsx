import styles from './reset-password.module.css';
import { useLayoutEffect, useState } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { loaderOn, loaderOff, errorOn } from '../../services/loading/actions';
import { showErrorDetails } from '../../services/modal/actions';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../utils/api';

function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordValue, setPasswordValue] = useState('');
    const [tokenValue, setCodeValue] = useState('');

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const onCodeChange = e => {
        setCodeValue(e.target.value)
    }

    useLayoutEffect(() => {
        if (!localStorage.getItem('emailSent')) {
            navigate('/');
        }
    }, [navigate])

    function handleResetPassword(e) {
        e.preventDefault();
        const data = {
            password: passwordValue,
            token: tokenValue
        }
        dispatch(loaderOn());
        Api.resetPassword(data)
            .then(() => {
                dispatch(loaderOff());
                localStorage.removeItem("emailSent");
                navigate('/login');
            })
            .catch((err) => {
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе:'));
                if (err.message === 'Incorrect reset token') {
                    dispatch(errorOn(`Введен неверный код из письма.`));
                } else if (err.message === 'Invalid credentials provided') {
                    dispatch(errorOn(`Необходимо заполнить все поля.`));
                } else {
                    dispatch(errorOn(`Ошибка: ${err.message}.`));
                }

            })
    }

    return (
        <form onSubmit={handleResetPassword} className={styles['reset-password']}>
            <div className={styles['input-container']}>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={onPasswordChange}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <div className={styles['input-container']}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onCodeChange}
                    value={tokenValue}
                    name={'code'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>
            <Button htmlType="submit" type="primary" size="large">
                Сохранить
            </Button>
        </form>
    )
}

export default ResetPassword;
