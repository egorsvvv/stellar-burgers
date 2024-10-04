import {
  ConstructorPage,
  Login,
  Feed,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { useDispatch } from '../../services/store';
import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import ProtectedRoute from '../protected-route/protected-route';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/registerUser';

const ModalWithNavigate = ({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const navigate = useNavigate();

  // Функция для закрытия модального окна и возврата на предыдущую страницу
  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};

// Основной контент приложения с логикой маршрутов
const AppContent = () => {
  const dispatch = useDispatch();

  // Проверяем авторизацию пользователя при монтировании компонента
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* Основные страницы */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Защищенные маршруты для авторизованных пользователей */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ModalWithNavigate title='Детали заказа'>
                <OrderInfo />
              </ModalWithNavigate>
            }
          />
        </Route>

        {/* Маршруты для модальных окон */}
        <Route
          path='/feed/:number'
          element={
            <ModalWithNavigate title='Детали заказа'>
              <OrderInfo />
            </ModalWithNavigate>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <ModalWithNavigate title='Детали ингредиента'>
              <IngredientDetails />
            </ModalWithNavigate>
          }
        />

        {/* Обработка несуществующих маршрутов */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

// Главный компонент App, оборачивающий приложение в Provider и BrowserRouter
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
