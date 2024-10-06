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
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { useDispatch } from '../../services/store';
import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import ProtectedRoute from '../protected-route/protected-route';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/registerUser';
import { getIngredients } from '../../services/slices/burgerIngridientsSlices';

const ModalWithNavigate = ({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const navigate = useNavigate();
  const onClose = () => navigate(-1);
  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Защищенные маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>

        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* Обработка несуществующих маршрутов */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные маршруты */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <ModalWithNavigate title='Детали заказа'>
                <OrderInfo />
              </ModalWithNavigate>
            }
          />
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
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
