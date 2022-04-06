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
    date: null,
  },
};

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    getUserFilesSuccess: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },

    getUserFileSuccess: (state, action: PayloadAction<File>) => {
      state.currentFolder.name = action.payload.name;
      state.currentFolder.type = action.payload.type;
    },
  },
});

export const { getUserFilesSuccess, getUserFileSuccess } = fileSlice.actions;

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

export const CreateFolder = (name) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const response = await api.post(`/files`, {
      name,
      type: 'dir',
      parent: '',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch(getUserFileSuccess(response.data));
  } catch (error: any) {}
};

export default fileSlice.reducer;
