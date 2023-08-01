import React from 'react';
import styles from './app-header.module.css';
import HeaderButton from '../header-button/header-button';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = React.memo((): JSX.Element => {

    return (
        <header className={styles['app-header']}>
            <nav className={styles['nav-container']}>
                <div className={styles['buttons-container']}>
                    <HeaderButton
                        Icon={BurgerIcon}
                        text='Конструктор'
                        currentPath={'/'}
                    />
                    <HeaderButton
                        Icon={ListIcon}
                        text='Лента заказов'
                        currentPath={'/feed'}
                    />
                </div>
                <div className={styles['logo-container']}>
                    <Logo />
                </div>
                <HeaderButton
                    Icon={ProfileIcon}
                    text='Личный кабинет'
                    currentPath={'/profile'}
                />
            </nav>
        </header>
    );
})

export default AppHeader;
