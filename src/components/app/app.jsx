import { useEffect, useCallback, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useMatch } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../../pages/main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorDetails from '../error-details/error-details';
import { loadIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../services/modal/selectors';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { showIngredientDetails } from '../../services/modal/actions';
import { addIngredientDetails, deleteIngredientDetails } from '../../services/ingredient-details/actions';
import { closeModal } from '../../services/modal/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loading from '../loading/loading';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const matchPattern = useMatch('/ingredients/:id');
  const background = location.state && location.state.background;

  const { ingredients } = useSelector(getIngredients);
  const { isOrderModalOpen, isIngredientModalOpen, isErrorModalOpen } = useSelector(getModal);

  const [ingredientDetailsPageTitle, setIngredientDetailsPageTitle] = useState('');

  const getIngredientForDetails = useCallback(() => {
    const ingredientId = matchPattern.params.id;
    const ingredient = ingredients.find(ingredient => ingredient._id === ingredientId);
    return ingredient;
  }, [ingredients, matchPattern])

  const ingredientDetailsForModal = useCallback(() => {
    const selectedIngredient = getIngredientForDetails();
    dispatch(addIngredientDetails(selectedIngredient));
    dispatch(showIngredientDetails('Детали ингредиента'));
  }, [dispatch, getIngredientForDetails])

  const ingredientDetailsForPage = useCallback(() => {
    const selectedIngredient = getIngredientForDetails();
    if (selectedIngredient !== undefined) {
      setIngredientDetailsPageTitle('Детали ингредиента');
      dispatch(addIngredientDetails(selectedIngredient));
    } else {
      setIngredientDetailsPageTitle('Ингредиент не найден');
    }
  }, [dispatch, getIngredientForDetails])

  useEffect(() => {
    if (ingredients.length !== 0) {
      if (background) {
        ingredientDetailsForModal();
      }
      if (matchPattern) {
        ingredientDetailsForPage();
      } else {
        dispatch(deleteIngredientDetails());
      }
    }
  },
    [
      matchPattern,
      ingredients,
      background,
      dispatch,
      ingredientDetailsForPage,
      ingredientDetailsForModal
    ]
  )

  const onCloseModal = useCallback(() => {
    if (isIngredientModalOpen) {
      navigate(-1);
    }
    dispatch(closeModal(isErrorModalOpen));
  }, [dispatch, isIngredientModalOpen, isErrorModalOpen, navigate])

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
        } />
        <Route path='/order-list'
          element={<div>Лента заказов</div>}
        />
        <Route path='/profile'
          element={<div>Профиль</div>}
        />
        {/* Для отдельной страницы с деталями ингредиентов */}
        <Route path='/ingredients/:id'
          element={
            <div className={styles['ingredient-container']}>
              <h2 className={styles['ingredient-heading']}>
                {ingredientDetailsPageTitle}
              </h2>
              <IngredientDetails />
            </div>
          }
        />
        {/* ---------------------------------------------- */}
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
      {/* Для модалки с деталями ингредиентов */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <div className={styles['app-hidden']}>
                {isIngredientModalOpen && (
                  <Modal onClose={onCloseModal}>
                    <IngredientDetails />
                  </Modal>
                )}
              </div>
            }
          />
        </Routes>
      )}
      {/* ---------------------------------- */}
      <div className={styles['app-hidden']}>
        {/* Для всех остальных модалок */}
        {(isOrderModalOpen || isErrorModalOpen) && (
          <Modal
            onClose={onCloseModal}
          >
            <>
              {isOrderModalOpen && (
                <OrderDetails />
              )}
              {isErrorModalOpen && (
                <ErrorDetails />
              )}
            </>
          </Modal>
        )}
        {/* ------------------------- */}
        <Loading />
      </div>

    </div>
  );
}

export default App;
