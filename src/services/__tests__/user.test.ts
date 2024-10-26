// userSlice.test.ts
import userReducer, {
    inititalState,
    registerUser,
    loginUser,
    getUser,
    logoutUser,
    authChecked,
    userLogout,
    userUpdate
  } from '../slices/registerUser'; // Убедитесь, что путь к файлу правильный
  import { TUser } from '@utils-types';
  
  // Мок-данные
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User',
  };
  
  describe('Проверка user', () => {
    it('должен установить loading в true при registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
    });
  
    it('должен добавить пользователя и установить loading в false при registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });
  
    it('должен установить ошибку и loading в false при registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' },
      };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
      expect(state.user).toBeNull();
    });
  
    it('должен установить loading в true при loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.isAuth).toBe(false);
    });
  
    it('должен добавить пользователя и установить loading в false при loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });
  
    it('должен установить ошибку и loading в false при loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка входа' },
      };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
      expect(state.isAuth).toBe(false);
    });
  
    it('должен установить loading в true при getUser.pending', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('должен получить пользователя и установить loading в false при getUser.fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });
  
    it('должен установить ошибку и loading в false при getUser.rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Ошибка получения пользователя' },
      };
      const state = userReducer(inititalState, action);
  
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка получения пользователя');
      expect(state.isAuth).toBe(false);
    });
  
    it('должен выйти из системы и сбросить пользователя при logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer({ ...inititalState, user: mockUser, isAuth: true }, action);
  
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.loading).toBe(false);
    });
  
    it('должен проверить аутентификацию при authChecked', () => {
      const action = { type: authChecked.type };
      const state = userReducer({ ...inititalState, user: mockUser }, action);
  
      expect(state.isAuth).toBe(true);
      expect(state.loading).toBe(false);
    });
  
    it('должен сбросить пользователя при userLogout', () => {
      const action = { type: userLogout.type };
      const state = userReducer({ ...inititalState, user: mockUser, isAuth: true }, action);
  
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.loading).toBe(false);
    });
  
    it('должен обновить пользователя при userUpdate', () => {
      const action = { type: userUpdate.type, payload: { user: mockUser } };
      const state = userReducer(inititalState, action);
  
      expect(state.user).toEqual(mockUser);
    });
  });
  