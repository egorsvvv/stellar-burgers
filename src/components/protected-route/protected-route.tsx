import { Outlet, Navigate } from 'react-router-dom';
import {
  selectAuth,
  authChecked,
  selectUser
} from '../../services/slices/registerUser';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

const ProtectedRoute = () => {
  const auth = useSelector(selectAuth);
  return auth ? <Outlet /> : <Navigate to='login' />;
};

export default ProtectedRoute;
