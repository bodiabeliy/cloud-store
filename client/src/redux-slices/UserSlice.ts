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
    authUserSuccess: (state) => {
      state.isAuth = true;
      console.log('Log in', state.isAuth);
    },
    authUserEntry: (state) => {
      state.isAuth = false;
      console.log('Log out', state.isAuth);
    },
  },
});

export const { authUserSuccess, authUserEntry } = userSlice.actions;

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
export const authUser = async (email: string, password: string) => {
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
  } catch (error: any) {}
};

// добавление jwt-токена авторизированому пользователю
export const getUserToken = async () => {
  try {
    const response = await api.get(`/auth/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    localStorage.setItem('token', response.data.token);
  } catch (error: any) {}
};

export default userSlice.reducer;
