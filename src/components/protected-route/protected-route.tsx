import { Outlet, Navigate, useLocation } from 'react-router-dom';
import {
  selectAuth,
  selectUser,
  selectLoading
} from '../../services/slices/registerUser';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

const ProtectedRoute = () => {
  const auth = useSelector(selectAuth);
  const loading = useSelector(selectLoading);
  const location = useLocation();

  // Пока идет проверка, показываем прелоадер
  if (loading) {
    return <Preloader />;
  }

  // Если пользователь не авторизован, направляем на страницу логина, сохраняя предыдущий URL для редиректа
  if (!auth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если авторизация подтверждена, рендерим дочерние компоненты
  return <Outlet />;
};

export default ProtectedRoute;
