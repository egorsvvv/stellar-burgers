import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser, selectAuth } from '../../services/slices/registerUser';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const handleLogout = () =>
    dispatch(logoutUser()).then((result) => {
      if (auth) {
        navigate('/login');
      }
    });

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
