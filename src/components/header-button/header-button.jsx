import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './header-button.module.css';

function HeaderButton(props) {

    const {
        Icon,
        text,
        onButtonClick
    } = props;

    const [type, setType] = useState('secondary');

    // Вместо ховеров при наведении на кнопку для смены цвета иконки для событий "onMouseMove" и "onMouseLeave"
    // Может цвета меняются не при наведении, а когда кнопка активна, но из макета не понятно
    // Уточнить и в будущем переделать, если нужно

    function primaryType() {
        setType('primary');
    }

    function secondaryType() {
        setType('secondary');
    }

    return (
        <div
            className={styles['header-button']}
            onClick={onButtonClick}
            onMouseMove={primaryType}
            onMouseLeave={secondaryType}
        >
            <Icon type={type} />
            <p className={styles['button-text']}>{text}</p>
        </div>
    );
}

export default HeaderButton;

HeaderButton.propTypes = {
    Icon: PropTypes.func,
    text: PropTypes.string,
    onButtonClick: PropTypes.func
};
