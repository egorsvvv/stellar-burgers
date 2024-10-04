import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

type TOrdersListSliceState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};
const initialState: TOrdersListSliceState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchAllOrders = createAsyncThunk('orders/', async () => {
  const response = await getOrdersApi();
  return response;
});

const ordersProfileSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
  selectors: {
    selectProfileOrder: (state) => state.orders
  }
});

export default ordersProfileSlice.reducer;
export const { selectProfileOrder } = ordersProfileSlice.selectors;

export const selectAllOrders = (state: { ordersList: TOrdersListSliceState }) =>
  state.ordersList.orders;
