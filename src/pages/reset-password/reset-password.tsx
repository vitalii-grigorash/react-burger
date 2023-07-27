import styles from './reset-password.module.css';
import { useLayoutEffect, useState } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../utils/hooks';
import { loaderOn, loaderOff, errorOn } from '../../services/loading/actions';
import { showErrorDetails } from '../../services/modal/actions';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../utils/api';
import { TResetPassword } from '../../utils/types';

function ResetPassword(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordValue, setPasswordValue] = useState<string>('');
    const [tokenValue, setCodeValue] = useState<string>('');

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodeValue(e.target.value)
    }

    useLayoutEffect(() => {
        if (!localStorage.getItem('emailSent')) {
            navigate('/');
        }
    }, [navigate])

    function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data: TResetPassword = {
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
