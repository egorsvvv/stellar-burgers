import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

type TBurgerConstructorSlice = {
  constructorItems: {
    ingredients: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  index: number;
};

const initialState: TBurgerConstructorSlice = {
  constructorItems: {
    ingredients: [],
    bun: null
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  index: 0
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    // Добавляем булку в конструктор
    addBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    // Добавляем ингредиент в конструктор
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
    },
    // Удаляем ингредиент из конструктора
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    // Очистка конструктора (после успешного заказа)
    clearConstructor(state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    // Запрос на создание заказа начался
    createOrderRequest(state) {
      state.orderRequest = true;
      state.error = null;
    },
    // Запрос на создание заказа успешно завершён
    createOrderSuccess(state, action: PayloadAction<TOrder>) {
      state.orderRequest = false;
      state.orderModalData = action.payload;
    },
    // Ошибка при создании заказа
    createOrderFailed(state, action: PayloadAction<string>) {
      state.orderRequest = false;
      state.error = action.payload;
    },
    // Закрытие модального окна с данными о заказе
    closeOrderModal(state) {
      state.orderModalData = null;
    },
    // Индекс для передвижения ингредиентов
    upAndDownIngredients(
      state,
      action: PayloadAction<{ currentIndex: number; targetIndex: number }>
    ) {
      const { currentIndex, targetIndex } = action.payload;

      // Проверяем, что индексы находятся в пределах массива ингредиентов
      if (
        currentIndex >= 0 &&
        targetIndex >= 0 &&
        currentIndex < state.constructorItems.ingredients.length &&
        targetIndex < state.constructorItems.ingredients.length
      ) {
        // Перемещаем ингредиенты в массиве, меняя их местами
        const temp = state.constructorItems.ingredients[currentIndex];
        state.constructorItems.ingredients[currentIndex] =
          state.constructorItems.ingredients[targetIndex];
        state.constructorItems.ingredients[targetIndex] = temp;
      }
    }
  }
});

// Экспортируем экшены
export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  closeOrderModal,
  upAndDownIngredients
} = constructorSlice.actions;

export default constructorSlice.reducer;
