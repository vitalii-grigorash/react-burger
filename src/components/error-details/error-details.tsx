import styles from './error-details.module.css';
import { getLoading } from '../../services/loading/selectors';
import { useSelector } from '../../utils/hooks';

function ErrorDetails(): JSX.Element {

    const { error } = useSelector(getLoading);

    return (
        <div className={styles['error-details']}>
            <h2 className={styles['error-text']}>{error}</h2>
        </div>
    );
}

export default ErrorDetails;
