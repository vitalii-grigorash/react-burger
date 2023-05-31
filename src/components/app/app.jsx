import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import * as Api from '../../utils/api';
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

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
      <Main
        ingredients={ingredients}
        openModal={openModal}
      />
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
    </div>
  );
}

export default App;
