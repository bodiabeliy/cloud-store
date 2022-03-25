import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';

interface FileState {}

const initialState: FileState = {};

export const visitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    getVisitStart: (state) => {},

    getVisitSuccess: (state, action: PayloadAction) => {},
    getVisitFailure: (state) => {},
  },
});

export const { getVisitStart, getVisitSuccess, getVisitFailure } = visitSlice.actions;

export const getVisitsSelector = (state: RootState) => {};

// Thunk actions
export const getVisits = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(getVisitStart());
    const response = await api.get<[]>(``, {
      headers: {},
      params: {},
    });

    dispatch(getVisitSuccess());
  } catch (error) {
    dispatch(getVisitFailure());
  }
};

export const getSingleVisit =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {};

export default visitSlice.reducer;
