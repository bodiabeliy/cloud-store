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
    getVisitStart: (state) => {},

    getVisitSuccess: (state, action: PayloadAction) => {},
    getVisitFailure: (state) => {},
  },
});

export const { getVisitStart, getVisitSuccess, getVisitFailure } = userSlice.actions;

export const getUserSelector = (state: RootState) => state.user.currentUser;

// Thunk actions
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

export const getSingleVisit =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {};

export default userSlice.reducer;
