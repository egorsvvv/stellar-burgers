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

  // if (loading) {
  //   return <Preloader />;
  // }
  return auth ? <Outlet /> : <Navigate to='login' />;
};

export default ProtectedRoute;
