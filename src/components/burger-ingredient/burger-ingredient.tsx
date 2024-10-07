import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
  addIngredient,
  addBun
} from '../../services/slices/burgerConstructorSlices';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const handleAdd = () => {
      const ingredientWithId = {
        ...ingredient,
        id: nanoid() // Добавляем поле id
      };

      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredientWithId)); // Если булка, добавляем в булки
      } else {
        dispatch(addIngredient(ingredientWithId)); // Если начинка, добавляем в начинку
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
