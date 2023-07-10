import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './user.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../services/user/selectors';
import { setUser } from '../../services/user/actions';
import { loaderOn, loaderOff, errorOn } from '../../services/loading/actions';
import { showErrorDetails } from '../../services/modal/actions';
import * as Api from '../../utils/api';

function User() {

    const dispatch = useDispatch();

    const { user } = useSelector(getUser);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isButtonsActive, setIsButtonsActive] = useState(false);

    const onNameChange = e => {
        setNameValue(e.target.value)
    }

    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const defaultFields = useCallback(() => {
        setNameValue(user.name);
        setEmailValue(user.email);
        setPasswordValue('');
    }, [user.name, user.email])

    useLayoutEffect(() => {
        defaultFields();
    }, [defaultFields])

    useEffect(() => {
        if (
            nameValue === user.name &&
            emailValue === user.email &&
            passwordValue === ''
        ) {
            setIsButtonsActive(false);
        } else {
            setIsButtonsActive(true);
        }
    },
        [
            nameValue,
            emailValue,
            passwordValue,
            user.name,
            user.email
        ]
    )

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: nameValue,
            email: emailValue,
            password: passwordValue
        }
        dispatch(loaderOn());
        Api.changeUser(data)
            .then((res) => {
                dispatch(setUser(res.user));
                dispatch(loaderOff());
                setPasswordValue('');
            })
            .catch((err) => {
                dispatch(loaderOff());
                dispatch(showErrorDetails('Ошибка при запросе:'));
                if (err.message === 'User with such email already exists') {
                    dispatch(errorOn('Пользователь с данным e-mail уже существует.'));
                } else {
                    dispatch(errorOn(`Ошибка: ${err.message}.`));
                }
            })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.user}>
            <div className={styles['input-container']}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onNameChange}
                    value={nameValue}
                    name={'name'}
                    size={'default'}
                    extraClass="ml-1"
                    icon={'EditIcon'}
                />
            </div>
            <div className={styles['input-container']}>
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={onEmailChange}
                    value={emailValue}
                    name={'email'}
                    size={'default'}
                    extraClass="ml-1"
                    icon={'EditIcon'}
                />
            </div>
            <div className={styles['input-container']}>
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    onChange={onPasswordChange}
                    value={passwordValue}
                    name={'password'}
                    size={'default'}
                    extraClass="ml-1"
                    icon={'EditIcon'}
                />
            </div>
            {isButtonsActive && (
                <div className={styles['buttons-container']}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={defaultFields}>
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    )
}

export default User;
