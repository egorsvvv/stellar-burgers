// Импортируем rootReducer напрямую из store
import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('должен инициализироваться с правильным начальным состоянием', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingridients');
    expect(initialState).toHaveProperty('burgerConstrucor');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('profileOrders');
  });
});
