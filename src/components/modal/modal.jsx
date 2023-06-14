import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../services/modal/selectors';
import { closeModal } from '../../services/modal/actions';
const modalRoot = document.getElementById("modal");

function Modal(props) {

    const {
        children
    } = props;

    const dispatch = useDispatch();
    const { isModalOpen, isIngredientModalOpen, isErrorModalOpen, modalTitle } = useSelector(getModal);

    const onClose = useCallback(() => {
        dispatch(closeModal(isIngredientModalOpen, isErrorModalOpen));
    }, [dispatch, isIngredientModalOpen, isErrorModalOpen])

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
            {isModalOpen && (
                <>
                    <div className={styles.modal}>
                        <div className={styles['modal-container']}>
                            <div className={styles['modal-heading-container']}>
                                <h2 className={styles['modal-heading']}>{modalTitle}</h2>
                                <div className={styles['close-button-container']} onClick={onClose}>
                                    <CloseIcon type="primary" />
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                    <ModalOverlay onClose={onClose} />
                </>
            )}
        </>,
        modalRoot
    )
}

export default Modal;

Modal.propTypes = {
    children: PropTypes.element
};
