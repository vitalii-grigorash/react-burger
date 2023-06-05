import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main(props) {

    const {
        openModal,
        createNewOrder
    } = props;

    return (
        <main className={styles.main}>
            <BurgerIngredients
                openModal={openModal}
            />
            <BurgerConstructor
                createNewOrder={createNewOrder}
            />
        </main>
    );
}

export default Main;

Main.propTypes = {
    openModal: PropTypes.func,
    createNewOrder: PropTypes.func
};
