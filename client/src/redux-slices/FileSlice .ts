import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';
import File from '../types/File';

interface FileState {
  files: File[];
  currentFolder: File;
}

const initialState: FileState = {
  files: [],
  currentFolder: {
    name: '',
    type: '',
    children: [],
    size: 0,
  },
};

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    getUserFilesSuccess: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
  },
});

export const { getUserFilesSuccess } = fileSlice.actions;

export const getFolderSelector = (state: RootState) => state.file.currentFolder;
export const getFilesSelector = (state: RootState) => state.file.files;

// Thunk actions
export const getFiles = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/files`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(getUserFilesSuccess(response.data));
  } catch (error: any) {
    alert(error);
  }
};

export const getSingleVisit =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {};

export default fileSlice.reducer;
