import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsManagementOpen } from './adminLoginSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const adminLogoutSlice = createSlice({
  name: 'adminLogout',
  initialState: {},
  reducers: {},
});

export const adminLogoutAsync = createAsyncThunk(
  'logout/adminLogout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/logout`);
      dispatch(setIsManagementOpen(false));
      return res.data;
    } catch (error) {
      rejectWithValue(error.massage);
    }
  }
);

export default adminLogoutSlice.reducer;
