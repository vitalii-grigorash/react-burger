import { useEffect, useCallback, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useMatch } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../../pages/main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorDetails from '../error-details/error-details';
import FormContainer from '../form-container/form-container';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Profile from '../../pages/profile/profile';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import User from '../../pages/user/user';
import Orders from '../../pages/orders/orders';
import OrderList from '../../pages/order-list/order-list';
import NotFound from '../../pages/not-found/not-found';
import { loadIngredients } from '../../services/burger-ingredients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getModal } from '../../services/modal/selectors';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { showIngredientDetails } from '../../services/modal/actions';
import { addIngredientDetails, deleteIngredientDetails } from '../../services/ingredient-details/actions';
import { OnlyAuth, OnlyUnAuth } from "../../utils/protected-route";
import { closeModal } from '../../services/modal/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { checkUserAuth } from '../../services/user/actions';
import Loading from '../loading/loading';
import { IIngredient } from '../../utils/types';
import * as H from 'history';

function App(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const matchPattern = useMatch('/ingredients/:id');

  const state = location.state as { background?: H.Location };

  const background = state && state.background;

  const { ingredients } = useSelector(getIngredients);
  const { isOrderModalOpen, isIngredientModalOpen, isErrorModalOpen } = useSelector(getModal);

  const [ingredientDetailsPageTitle, setIngredientDetailsPageTitle] = useState<string>('');

  useEffect(() => {
    /* @ts-ignore */
    dispatch(checkUserAuth());
  }, [dispatch])

  const getIngredientForDetails = useCallback(() => {
    const ingredientId = matchPattern !== null && matchPattern.params.id;
    const ingredient: IIngredient = ingredients.find((ingredient: IIngredient): boolean => ingredient._id === ingredientId);
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
    /* @ts-ignore */
    dispatch(closeModal(isErrorModalOpen));
  }, [dispatch, isIngredientModalOpen, isErrorModalOpen, navigate])

  useEffect(() => {
    /* @ts-ignore */
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
          element={<OrderList />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<User />} />
          <Route path='orders' element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Route>
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
        <Route path='/login'
          element={<OnlyUnAuth component={
            <FormContainer
              heading='Вход'
              linkText=''
            >
              <Login />
            </FormContainer>
          } />}
        />
        <Route path='/register'
          element={<OnlyUnAuth component={
            <FormContainer
              heading='Регистрация'
              linkText='Уже зарегистрированы?'
            >
              <Register />
            </FormContainer>
          } />}
        />
        <Route path='/forgot-password'
          element={<OnlyUnAuth component={
            <FormContainer
              heading='Восстановление пароля'
              linkText='Вспомнили пароль?'
            >
              <ForgotPassword />
            </FormContainer>
          } />}
        />
        <Route path='/reset-password'
          element={<OnlyUnAuth component={
            <FormContainer
              heading='Восстановление пароля'
              linkText='Вспомнили пароль?'
            >
              <ResetPassword />
            </FormContainer>
          } />}
        />
        <Route path="*" element={<NotFound />} />
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
