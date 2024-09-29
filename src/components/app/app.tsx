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
import store from '../../services/store';
import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import ProtectedRoute from '../protected-route/protected-route';
import { useNavigate } from 'react-router-dom';

const ModalWithNavigate = ({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/orders' element={<ProfileOrders />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ModalWithNavigate title='Детали заказа'>
                  <OrderInfo />
                </ModalWithNavigate>
              }
            />
          </Route>
          <Route path='*' element={<NotFound404 />} />
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
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
