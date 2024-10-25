// Импортируем необходимые зависимости и редьюсер
import constructorReducer, {
    addIngredient,
    removeIngredient,
    upAndDownIngredients
  } from '../slices/burgerConstructorSlices';
  import { TConstructorIngredient } from '@utils-types';
  
  // Mock данных
  const mockIngredient1: TConstructorIngredient = { 
    _id: '1',
    id: '1',
    name: 'Ingredient 1',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 100,
    image: 'image1',
    image_mobile: 'image1_mobile',
    image_large: 'image1_large'
  };
  const mockIngredient2: TConstructorIngredient = { 
    _id: '2',
    id: '2',
    name: 'Ingredient 2',
    type: 'main',
    proteins: 90,
    fat: 30,
    carbohydrates: 60,
    calories: 500,
    price: 150,
    image: 'image2',
    image_mobile: 'image2_mobile',
    image_large: 'image2_large'
  };
  const mockIngredient3: TConstructorIngredient = { 
    _id: '3',
    id: '3',
    name: 'Ingredient 3',
    type: 'main',
    proteins: 70,
    fat: 20,
    carbohydrates: 40,
    calories: 300,
    price: 200,
    image: 'image3',
    image_mobile: 'image3_mobile',
    image_large: 'image3_large'
  };
  // Тесты для конструктора
  describe('constructorSlice', () => {
    it('должен добавить ингредиент при срабатывании экшена addIngredient', () => {
      const initialState = { constructorItems: { ingredients: [], bun: null }, orderRequest: false, orderModalData: null, error: null, index: 0 };
      const action = addIngredient(mockIngredient1);
      const state = constructorReducer(initialState, action);
      
      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toEqual(mockIngredient1);
    });
  
    it('должен удалить ингредиент по id при срабатывании экшена removeIngredient', () => {
      const initialState = {
        constructorItems: {
          ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
          bun: null
        },
        orderRequest: false,
        orderModalData: null,
        error: null,
        index: 0
      };
      const action = removeIngredient(mockIngredient2.id);
      const state = constructorReducer(initialState, action);
  
      expect(state.constructorItems.ingredients).toHaveLength(2);
      expect(state.constructorItems.ingredients).not.toContainEqual(mockIngredient2);
    });
  
    it('должен изменить порядок ингредиентов при срабатывании экшена upAndDownIngredients', () => {
      const initialState = {
        constructorItems: {
          ingredients: [mockIngredient1, mockIngredient2, mockIngredient3],
          bun: null
        },
        orderRequest: false,
        orderModalData: null,
        error: null,
        index: 0
      };
      const action = upAndDownIngredients({ currentIndex: 0, targetIndex: 2 });
      const state = constructorReducer(initialState, action);
  
      expect(state.constructorItems.ingredients[0]).toEqual(mockIngredient3);
      expect(state.constructorItems.ingredients[2]).toEqual(mockIngredient1);
    });
  });
  