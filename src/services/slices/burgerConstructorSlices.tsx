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
    addBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    clearConstructor(state) {
      (state.constructorItems.ingredients = []),
        (state.constructorItems.bun = null);
    },
    upAndDownIngredients(
      state,
      action: PayloadAction<{ currentIndex: number; targetIndex: number }>
    ) {
      const { currentIndex, targetIndex } = action.payload;
      if (
        currentIndex >= 0 &&
        targetIndex >= 0 &&
        currentIndex < state.constructorItems.ingredients.length &&
        targetIndex < state.constructorItems.ingredients.length
      ) {
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
  upAndDownIngredients,
  clearConstructor
} = constructorSlice.actions;

export const {} = constructorSlice.selectors;

export default constructorSlice.reducer;
