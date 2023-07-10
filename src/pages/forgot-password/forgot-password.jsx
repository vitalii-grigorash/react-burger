import styles from './forgot-password.module.css';
import { useState } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { loaderOn, loaderOff, errorOn } from '../../services/loading/actions';
import { showErrorDetails } from '../../services/modal/actions';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../utils/api';

function ForgotPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');

    const onEmailChange = e => {
        setEmailValue(e.target.value);
    }

    function handleSendEmail(e) {
        e.preventDefault();
        const data = {
            email: emailValue
        }
        dispatch(loaderOn());
        Api.sendEmail(data)
            .then(() => {
                dispatch(loaderOff());
                localStorage.setItem('emailSent', "true");
                navigate('/reset-password');
            })
            .catch((err) => {
                dispatch(loaderOff());
                dispatch(errorOn(`Ошибка: ${err.message}.`));
                dispatch(showErrorDetails('Ошибка при запросе'));
            })
    }

    return (
        <form onSubmit={handleSendEmail} className={styles['forgot-password']}>
            <div className={styles['input-container']}>
                <EmailInput
                    onChange={onEmailChange}
                    value={emailValue}
                    name={'email'}
                    isIcon={false}
                    placeholder='Укажите e-mail'
                />
            </div>
            <Button htmlType="submit" type="primary" size="large">
                Восстановить
            </Button>
        </form>
    )
}

export default ForgotPassword;
