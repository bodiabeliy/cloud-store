import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';

import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

interface VisitState {}

const initialState: VisitState = {};

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

type TGetTasksParams = {
  page?: number;
  sort?: string;
  // TODO дополнить
};

// Thunk actions
export const getVisits =
  (params?: TGetTasksParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
