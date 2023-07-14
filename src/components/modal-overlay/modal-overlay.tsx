import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClose: () => void;
}

function ModalOverlay(props: IModalOverlayProps) {

    const {
        onClose
    } = props;

    return (
        <div className={styles['modal-overlay']} onClick={onClose} />
    )
}

export default ModalOverlay;
