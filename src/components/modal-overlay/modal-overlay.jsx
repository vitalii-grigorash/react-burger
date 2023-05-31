import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {

    const {
        onClose
    } = props;

    return (
        <div className={styles['modal-overlay']} onClick={onClose} />
    )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    onClose: PropTypes.func
};
