import styles from './register.module.css';
import { useState } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { register } from '../../services/user/actions';

function Register() {

    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onNameChange = e => {
        setNameValue(e.target.value);
    }

    const onEmailChange = e => {
        setEmailValue(e.target.value);
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value);
    }

    function handleRegister(e) {
        e.preventDefault();
        const data = {
            email: emailValue,
            password: passwordValue,
            name: nameValue
        }
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
