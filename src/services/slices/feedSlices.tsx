import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder, TOrdersData } from '@utils-types';

type TFeedSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  feed: {
    total: number;
    totalToday: number;
  };
};

const initialState: TFeedSlice = {
  orders: [],
  isLoading: false,
  error: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () => {
  const response = await getFeedsApi(); // Получаем данные через API
  return response; // Возвращаем результат
});

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
  }
});

export const { selectFeed, selectOrders } = feedsSlice.selectors;

export default feedsSlice.reducer;
