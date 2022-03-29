import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';

interface FileState {
  files: any[];
  currentFolder: {};
}

const initialState: FileState = {
  files: [],
  currentFolder: null,
};

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
});

export const {} = fileSlice.actions;

export const getFolderSelector = (state: RootState) => state.file.currentFolder;

// Thunk actions
export const getFiles = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const response = await api.get(`/files`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    console.log(response.data);
  } catch (error: any) {
    alert(error);
  }
};

export const getSingleVisit =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {};

export default fileSlice.reducer;
