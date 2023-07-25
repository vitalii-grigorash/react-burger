import styles from './register.module.css';
import { useState } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { register } from '../../services/user/actions';
import { IUser } from '../../utils/types';

function Register(): JSX.Element {

    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState<string>('');
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    }

    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data: IUser = {
            email: emailValue,
            password: passwordValue,
            name: nameValue
        }
        /* @ts-ignore */
        dispatch(register(data));
    }

    return (
        <form onSubmit={handleRegister} className={styles.register}>
            <div className={styles['input-container']}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onNameChange}
                    value={nameValue}
                    name={'name'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>
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
                Зарегистрироваться
            </Button>
        </form>
    )
}

export default Register;
