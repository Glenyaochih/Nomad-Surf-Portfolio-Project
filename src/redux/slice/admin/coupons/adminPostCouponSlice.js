import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetCouponsAsync } from './adminGetCouponsSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const initialCouponPostState = {
  title: '',
  is_enabled: 0,
  percent: 0,
  due_date: 0,
  code: '',
};

export const adminPostCouponSlice = createSlice({
  name: 'adminPostCoupon',
  initialState: {
    initData: initialCouponPostState,
  },
  reducers: {
    setPostCouponInputChange: (state, action) => {
      const { value, name, checked, type } = action.payload;
      state.initData[name] = type === 'checkbox' ? checked : value;
    },

    setResetCouponInitialState: (state) => {
      state.initData = initialCouponPostState; //清空輸入框
    },
  },
});

export const adminPostCouponAsync = createAsyncThunk(
  'postCoupon/adminPostCoupon',
  async (_, { getState, dispatch }) => {
    const initData = getState().adminPostCoupon.initData;
    const dateObject = new Date(initData.due_date);
    const data = {
      data: {
        ...initData,
        percent: Number(initData.percent),
        due_date: dateObject.getTime(),
        is_enabled: initData.is_enabled ? 1 : 0,
      },
    };
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, data);
      dispatch(adminGetCouponsAsync({}));
      dispatch(setResetCouponInitialState());
    } catch (error) {
      console.log(error);
    }
  }
);
export const { setPostCouponInputChange, setResetCouponInitialState } =
  adminPostCouponSlice.actions;
export default adminPostCouponSlice.reducer;
