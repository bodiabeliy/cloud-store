import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import api from '../api';
import File from '../types/File';
import { FolderFilled } from '@ant-design/icons';

interface FileState {
  files: File[];
  currentFolder: File;
  isLoading: boolean;
}

const initialState: FileState = {
  files: [],
  currentFolder: {
    _id: '6251ca16d564a6b33cc48d7a',
    name: '',
    type: 'dir',
  },
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

    getUserFileSuccess: (state, action: PayloadAction<File>) => {},

    createUserFilesStart: (state) => {
      state.isLoading = true;
    },
    createUserFilesSuccess: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
      state.isLoading = false;
    },

    deleteUserFileSuccess: (state, action: PayloadAction<File>) => {
      state.files = state.files.filter((file) => file._id !== action.payload);
    },
  },
});

export const {
  getUserFilesStart,
  getUserFilesSuccess,
  getUserFileSuccess,
  createUserFilesStart,
  createUserFilesSuccess,
  deleteUserFileSuccess,
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
export const getFile = (fileId) => async (dispatch: AppDispatch) => {
  // console.log('get single', fileId);

  try {
    setTimeout(async () => {
      const response = await api.get(`/files?id=${fileId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(getUserFileSuccess(fileId));
    }, 1500);
  } catch (error: any) {
    console.log('file error');
  }
};

export const deleteFile = (FileId) => async (dispatch: AppDispatch) => {
  try {
    setTimeout(async () => {
      const response = await api.delete(`/files?id=${FileId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(deleteUserFileSuccess(FileId));
    }, 1500);
  } catch (error: any) {
    console.log('file error');
  }
};

export const createFiles = (folderId: any, name: string) => async (dispatch: AppDispatch) => {
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
