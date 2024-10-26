import ingredientsReducer, {
  getIngredients,
  initialState
} from '../slices/burgerIngridientsSlices';
import { TIngredient } from '@utils-types';

// Моки данных
const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 20,
    carbohydrates: 50,
    calories: 200,
    price: 100,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  },
  {
    _id: '2',
    name: 'Соус',
    type: 'sauce',
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    calories: 100,
    price: 50,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  }
];

describe('ingredientsSlice', () => {
  it('должен установить isLoading в true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен добавить ингредиенты и установить isLoading в false при getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен установить ошибку и isLoading в false при getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
