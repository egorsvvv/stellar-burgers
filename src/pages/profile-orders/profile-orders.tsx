import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchAllOrders,
  selectProfileOrder
} from '../../services/slices/profileOrderSlices';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);
  const orders = useSelector(selectProfileOrder);

  return <ProfileOrdersUI orders={orders} />;
};
