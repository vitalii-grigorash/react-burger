import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
const modalRoot = document.getElementById("modal");

function Modal(props) {

    const {
        onClose,
        isOrderOpen,
        children
    } = props;

    const handleCloseModal = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose])

    useEffect(() => {
        document.addEventListener('keydown', handleCloseModal);
        return () => {
            document.removeEventListener('keydown', handleCloseModal);
        }
    }, [handleCloseModal])

    return createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles['modal-container']}>
                    <div className={styles['modal-heading-container']}>
                        {!isOrderOpen && (
                            <h2 className={styles['modal-heading']}>Детали ингредиента</h2>
                        )}
                        <div className={styles['close-button-container']} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        modalRoot
    )
}

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func,
    isOrderOpen: PropTypes.bool,
    children: PropTypes.element
};
