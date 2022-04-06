import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';
import User from '../types/User';

interface UserState {
  currentUser: User;
  isAuth: boolean;
}

const initialState: UserState = {
  currentUser: {
    email: '',
    password: '',
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser.email = action.payload.email;
      state.currentUser.password = action.payload.password;
      state.isAuth = true;
    },
    logoutUserSuccess: (state) => {
      state.currentUser.email = '';
      state.currentUser.password = '';
      state.isAuth = false;
    },
  },
});

export const { loginUserSuccess, logoutUserSuccess } = userSlice.actions;

export const getUserSelector = (state: RootState) => state.user.currentUser;
export const isAuthUserSelector = (state: RootState) => state.user.isAuth;

// регистрация пользователя
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post(`/auth/registration`, {
      email,
      password,
    });
    // console.log(response.data);
  } catch (error: any) {
    alert(error);
  }
};

// авторизация пользователя
export const Login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });

    dispatch(loginUserSuccess(response.data.user));

    localStorage.setItem('token', response.data.token);
  } catch (error: any) {}
};

// добавление jwt-токена авторизированому пользователю
export const getUserToken = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/auth/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(loginUserSuccess(response.data.user));
    // console.log(response.data.user);

    localStorage.setItem('token', response.data.token);
  } catch (error: any) {
    // localStorage.removeItem('token');
  }
};

export default userSlice.reducer;
