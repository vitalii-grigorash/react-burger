import { useEffect, useCallback } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorDetails from '../error-details/error-details';
import { loadIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../services/modal/selectors';
import { closeModal } from '../../services/modal/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loading from '../loading/loading';

function App() {

  const dispatch = useDispatch();
  const { isOrderModalOpen, isIngredientModalOpen, isErrorModalOpen } = useSelector(getModal);

  const onCloseModal = useCallback(() => {
    dispatch(closeModal(isIngredientModalOpen, isErrorModalOpen));
  }, [dispatch, isIngredientModalOpen, isErrorModalOpen])

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
        <Modal
          onClose={onCloseModal}
        >
          <>
            {isOrderModalOpen && (
              <OrderDetails />
            )}
            {isIngredientModalOpen && (
              <IngredientDetails />
            )}
            {isErrorModalOpen && (
              <ErrorDetails />
            )}
          </>
        </Modal>
        <Loading />
      </div>
    </div>
  );
}

export default App;
