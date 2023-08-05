import { createPortal } from 'react-dom';
import styles from './loading.module.css';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from '../../utils/hooks';
import { getLoading } from '../../services/loading/selectors';
const loadingRoot = document.getElementById("loading");

function Loading() {

    const { loading } = useSelector(getLoading);

    return createPortal(
        <>
            {loading && (
                <div className={styles.overlay}>
                    <div className={styles['spinner-container']}>
                        <TailSpin
                            height="120"
                            width="120"
                            color="#4C4CFF"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={loading}
                        />
                    </div>
                </div>
            )}
        </>,
        loadingRoot!
    )
}

export default Loading;
