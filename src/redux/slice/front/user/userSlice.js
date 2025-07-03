import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserAPI } from './userAPI';

const initialState = { user: {}, isUserLoading: false, userError: null };

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const userSignupAsync = createAsyncThunk(
  'user/userSignup',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await getUserAPI.userSignup(data);
      console.log(res);
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);

export default userSlice.reducer;
