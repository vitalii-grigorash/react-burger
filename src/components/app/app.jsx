import { useEffect, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { TotalPriceContext } from '../../services/totalPriceContext';
import { loadIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../services/modal/selectors';
import Loading from '../loading/loading';

const totalPriceInitialState = { price: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { price: state.price + action.payload };
    case "decrement":
      return { price: state.price - action.payload };
    case "reset":
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {

  const dispatch = useDispatch();
  const { isOrderModalOpen } = useSelector(getModal);
  const [priceState, priceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
      <TotalPriceContext.Provider value={{ priceState, priceDispatcher }}>
        <Main />
      </TotalPriceContext.Provider>
      <div className={styles['app-hidden']}>
        <Modal>
          {isOrderModalOpen ? (
            <OrderDetails />
          ) : (
            <IngredientDetails />
          )}
        </Modal>
        <Loading />
      </div>
    </div>
  );
}

export default App;
