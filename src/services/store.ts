import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/burgerIngridientsSlices';
import сonstructorReducer from './slices/burgerConstructorSlices';
import feedsReducer from './slices/feedSlices';
import orderReducer from './slices/orderSlices';

const rootReducer = combineReducers({
  ingridients: ingredientsReducer,
  burgerConstrucor: сonstructorReducer,
  feeds: feedsReducer,
  orders: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
