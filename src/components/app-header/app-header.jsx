import styles from './app-header.module.css';
import HeaderButton from '../header-button/header-button';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

    // Заготовка методов для будущих кликов по кнопкам в шапке
    function onBurgerButtonClick() {}

    function onListButtonClick() {}

    function onProfileButtonClick() {}

    return (
        <header className={styles['app-header']}>
            <nav className={styles['nav-container']}>
                <div className={styles['buttons-container']}>
                    <HeaderButton
                        Icon={BurgerIcon}
                        text='Конструктор'
                        onButtonClick={onBurgerButtonClick}
                    />
                    <HeaderButton
                        Icon={ListIcon}
                        text='Лента заказов'
                        onButtonClick={onListButtonClick}
                    />
                </div>
                <div className={styles['logo-container']}>
                    <Logo />
                </div>
                <HeaderButton
                    Icon={ProfileIcon}
                    text='Личный кабинет'
                    onButtonClick={onProfileButtonClick}
                />
            </nav>
        </header>
    );
}

export default AppHeader;
