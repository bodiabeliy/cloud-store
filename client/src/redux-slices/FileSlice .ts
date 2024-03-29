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
    downloadUserFileSuccess: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;

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
  downloadUserFileSuccess,
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

export const uploadFile = (file) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData();

    formData.append('file', file);
    console.log('upload', file);

    // if (folderId) {
    //   formData.append('parent', folderId);
    // }

    dispatch(createUserFilesStart());
    const response = await api.post(`/files/upload`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      onDownloadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader('x-decompressed-content-length');
        console.log('total length', totalLength);
        if (totalLength) {
          let progress = Math.round((progressEvent.loaded * 100) / totalLength);
          console.log('progress', progress);
        }
      },
    });

    dispatch(getUserFilesSuccess(response.data));
  } catch (error: any) {
    console.log('file error');
  }
};

export const downloadFile =(fileId, fileName) => async (dispatch: AppDispatch) => {
  console.log('file in slice', fileId);
  
  const response = await api.get(`/files/download?id=${fileId}`,  {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    responseType: 'blob'
  })

  
  if (response.status == 200) {
    const blob = response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()

  }

}

export default fileSlice.reducer;
