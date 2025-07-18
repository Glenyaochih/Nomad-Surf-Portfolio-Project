import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserAPI } from './userAPI';
import { createAsyncMessage } from '../../message/messageSlice';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
//初始值
const initialState = {
  user: {},
  signupData: {},
  isUserLogin: false,
  isUserLoading: false,
  isMember: true,
  usersError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsMember: (state, action) => {
      state.isMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //註冊
      .addCase(userSignupAsync.pending, (state) => {
        state.isUserLoading = true;
        state.isMember = false;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.signupData = action.payload;
        state.isUserLoading = false;
        state.isMember = true;
      })
      .addCase(userSignupAsync.rejected, (state, actions) => {
        state.isUserLoading = false;
        state.usersError = actions.payload;
        state.isMember = false;
      })
      //登入
      .addCase(userSigninAsync.pending, (state) => {
        state.isUserLoading = true;
        state.isUserLogin = false;
      })
      .addCase(userSigninAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoading = false;
        state.isUserLogin = true;
      })
      .addCase(userSigninAsync.rejected, (state, action) => {
        state.usersError = action.payload;
        state.isUserLoading = false;
        state.isUserLogin = false;
      });
  },
});

export const userSignupAsync = createAsyncThunk(
  'user/userSignup',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await getUserAPI.userSignup(data);
      dispatch(createAsyncMessage({ message: '註冊成功', success: true }));
      return res.data;
    } catch (error) {
      dispatch(
        createAsyncMessage({ message: error.response.data, success: false })
      );
      rejectWithValue(error.response.data);
    }
  }
);

export const userSigninAsync = createAsyncThunk(
  'user/userSignin',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await getUserAPI.userSignin(data);
      const { accessToken } = res.data;
      const decodeToken = jwtDecode(accessToken);
      console.log(decodeToken.exp);
      document.cookie = `usersToken=${accessToken}; expires=${new Date(decodeToken.exp)}`;
      axios.defaults.headers.common['Authorization'] = accessToken;
      dispatch(createAsyncMessage({ message: '登入成功', success: true }));
      return res.data.user;
    } catch (error) {
      dispatch(
        createAsyncMessage({ message: error.response.data, success: false })
      );
      return rejectWithValue(error.response.data);
    }
  }
);
export const { setIsMember } = userSlice.actions;
export default userSlice.reducer;
