import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/registerUser';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () =>
    dispatch(logoutUser()).then((result) => {
      if (result.payload) {
        navigate('/login');
      }
    });

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
