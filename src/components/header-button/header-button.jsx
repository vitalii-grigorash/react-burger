import PropTypes from 'prop-types';
import styles from './header-button.module.css';
import { Link, useMatch } from 'react-router-dom';

function HeaderButton(props) {

    const {
        Icon,
        text,
        currentPath
    } = props;

    const isMatch = useMatch(currentPath);

    return (
        <Link
            className={styles[`${isMatch ? 'header-button-active' : 'header-button'}`]}
            to={currentPath}
        >
            <Icon type={isMatch ? 'primary' : 'secondary'} />
            <p className={styles['button-text']}>{text}</p>
        </Link>
    );
}

export default HeaderButton;

HeaderButton.propTypes = {
    Icon: PropTypes.func,
    text: PropTypes.string,
    currentPath: PropTypes.string
};
