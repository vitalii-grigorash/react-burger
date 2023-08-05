import styles from './bun-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { getConstructor } from '../../services/burger-constructor/selectors';

interface IBunConstructorProps {
    type: 'top' | 'bottom';
    text: string;
}

function BunConstructor(props: IBunConstructorProps): JSX.Element {

    const {
        type,
        text
    } = props;

    const { bun } = useSelector(getConstructor);

    return (
        <div className={styles['bun-constructor']}>
            {bun ? (
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text={`${bun.name} ${text}`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            ) : (
                <div className={styles[`${type === 'top' ? 'default-container-top' : 'default-container-bottom'}`]}>
                    <p className={styles['default-container-text']}>Выберите булку</p>
                </div>
            )}
        </div>
    );
}

export default BunConstructor;
