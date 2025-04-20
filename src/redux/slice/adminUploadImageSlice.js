import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setUploadImageHandler,
  setUploadImagesHandler,
} from './adminPostProductSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminUploadPhotoSlice = createSlice({
  name: 'adminUploadPhoto',
  initialState: {},
  reducers: {},
});

export const adminUploadImageAsync = createAsyncThunk(
  'uploadImage/adminUploadImage',
  async (payload, { dispatch }) => {
    const { file, name } = payload;
    const formData = new FormData();
    formData.append('file-to-upload', file);
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/admin/upload`,
        formData
      );
      const newImages = res.data.imageUrl;
      name === 'file'
        ? dispatch(setUploadImageHandler(newImages))
        : dispatch(setUploadImagesHandler(newImages));
    } catch (error) {
      console.log(error);
    }
  }
);

export default adminUploadPhotoSlice.reducer;
