import styles from './header-button.module.css';
import { Link, useMatch } from 'react-router-dom';

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

type TIconProps = {
    type: TIconTypes;
    onClick?: () => void;
};

interface IHeaderButton {
    Icon: ({ type }: TIconProps) => JSX.Element;
    text: string;
    currentPath: string;
}

function HeaderButton(props: IHeaderButton): JSX.Element {

    const {
        Icon,
        text,
        currentPath
    } = props;

    const isMatch = useMatch(currentPath === '/profile' ? '/profile/*' : currentPath);

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
