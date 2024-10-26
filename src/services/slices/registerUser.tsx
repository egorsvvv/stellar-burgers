import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { TLoginData, TRegisterData } from '../../utils/burger-api';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

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
  loading: true
};

export const registerUser = createAsyncThunk(
  '/register',
  async (user: TRegisterData) => {
    const response = await registerUserApi(user);
    localStorage.setItem('userRegister', JSON.stringify(response));
    return response;
  }
);

export const loginUser = createAsyncThunk(
  '/login',
  async (user: TLoginData) => {
    const response = await loginUserApi(user);
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const getUser = createAsyncThunk('auth/user', async () => {
  const response = await getUserApi();
  return response;
});

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await logoutApi();
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userLogout());
  }
);

export const updateUser = createAsyncThunk(
  'auth/user',
  async (user: TRegisterData) => {
    const response = updateUserApi(user);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: inititalState,
  reducers: {
    authChecked: (state) => {
      state.isAuth = Boolean(state.user);
      state.loading = false;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
    },
    userUpdate: (state, action) => {
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.isAuth = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuth = false;
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuth = false;
        state.loading = false;
      });
  },
  selectors: {
    selectName: (state) => state.user?.name,
    selectEmail: (state) => state.user?.email,
    selectAuth: (state) => state.isAuth,
    selectUser: (state) => state.user,
    selectLoading: (state) => state.loading
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/check',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked, userLogout, userUpdate } = userSlice.actions;

export const {
  selectName,
  selectEmail,
  selectAuth,
  selectUser,
  selectLoading
} = userSlice.selectors;

export default userSlice.reducer;
