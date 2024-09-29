import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { TRegisterData } from '@api';
import {
  refreshToken,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

type TUserSliceState = {
  user: TUser | null;
  error: string | null;
  isAuth: boolean;
  loading: boolean;
};

export const inititalState: TUserSliceState = {
  user: null,
  error: null,
  isAuth: false,
  loading: false,
};

export const registerUser = createAsyncThunk(
    '/register',
    async (user: TRegisterData) => {
        const response = await registerUserApi(user);
        return response
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: inititalState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
           state.loading = true;
           state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            
        })
    }
})