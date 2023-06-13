import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { loadIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../services/modal/selectors';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loading from '../loading/loading';

function App() {

  const dispatch = useDispatch();
  const { isOrderModalOpen } = useSelector(getModal);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
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
