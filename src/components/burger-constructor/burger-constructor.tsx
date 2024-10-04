import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchOrders, selectOrders } from '../../services/slices/orderSlices';
import { clearConstructor } from '../../services/slices/burgerConstructorSlices';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();

  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstrucor.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstrucor.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstrucor.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(clearConstructor());
    dispatch(fetchOrders(ingredientIds));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
