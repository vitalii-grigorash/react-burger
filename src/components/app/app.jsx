import { useEffect, useState, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import * as Api from '../../utils/api';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../services/ingredientsContext';
import { OrderNumberContext } from '../../services/orderNumberContext';
import { TotalPriceContext } from '../../services/totalPriceContext';

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

  const [ingredients, setIngredients] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [priceState, priceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);

  function closeModal() {
    setIsModalOpen(false);
    setIsOrderModalOpen(false);
    setSelectedIngredient({});
  }

  function openModal(isOrderModal, ingredient) {
    if (isOrderModal) {
      setIsModalOpen(true);
      setIsOrderModalOpen(true);
    } else {
      setIsModalOpen(true);
      setSelectedIngredient(ingredient);
    }
  }

  function createNewOrder(data) {
    Api.createOrder(data)
      .then((res) => {
        if (res.success) {
          setOrderNumber(res.order.number);
          openModal(true);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  useEffect(() => {
    Api.getIngredients()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={ingredients}>
        <TotalPriceContext.Provider value={{ priceState, priceDispatcher }}>
          <Main
            openModal={openModal}
            createNewOrder={createNewOrder}
          />
        </TotalPriceContext.Provider>
      </IngredientsContext.Provider>
      <OrderNumberContext.Provider value={orderNumber}>
        <div className={styles['app-hidden']}>
          {isModalOpen && (
            <Modal
              onClose={closeModal}
              isOrderOpen={isOrderModalOpen}
            >
              {isOrderModalOpen ? (
                <OrderDetails />
              ) : (
                <IngredientDetails
                  ingredient={selectedIngredient}
                />
              )}
            </Modal>
          )}
        </div>
      </OrderNumberContext.Provider>
    </div>
  );
}

export default App;
