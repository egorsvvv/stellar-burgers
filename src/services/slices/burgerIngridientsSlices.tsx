import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerIngridientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TBurgerIngridientsSlice = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('/ingridients', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        (state.isLoading = false), (state.ingredients = action.payload);
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
  selectors: {
    selectBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMain: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauce: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    selectIngridient: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
  }
});

export const {
  selectBuns,
  selectMain,
  selectSauce,
  selectIngridient,
  selectIsLoading
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
