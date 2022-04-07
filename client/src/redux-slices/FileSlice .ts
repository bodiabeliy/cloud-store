import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';
import File from '../types/File';

interface FileState {
  files: File[];
  currentFolder: any;
  isLoading: boolean;
}

const initialState: FileState = {
  files: [],
  currentFolder: 0,
  isLoading: true,
};

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    getUserFilesStart: (state) => {
      state.isLoading = true;
    },
    getUserFilesSuccess: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
      state.isLoading = false;
    },

    createUserFilesStart: (state) => {
      state.isLoading = true;
    },
    createUserFilesSuccess: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getUserFilesStart,
  getUserFilesSuccess,
  createUserFilesStart,
  createUserFilesSuccess,
} = fileSlice.actions;

export const getFolderSelector = (state: RootState) => state.file.currentFolder;
export const getFilesSelector = (state: RootState) => state.file.files;
export const isFilesLoadingSelector = (state: RootState) => state.file.isLoading;

// Thunk actions
export const getFiles = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUserFilesStart());
    setTimeout(async () => {
      const response = await api.get(`/files`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(getUserFilesSuccess(response.data));
    }, 1500);
  } catch (error: any) {
    console.log('file error');
  }
};

export const createFiles = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(createUserFilesStart());
    const response = await api.post(
      `/files`,
      {
        name,
        type: 'dir',
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    dispatch(getUserFilesSuccess(response.data));
  } catch (error: any) {
    console.log('file error');
  }
};

export default fileSlice.reducer;
