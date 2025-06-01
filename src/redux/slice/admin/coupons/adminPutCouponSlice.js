import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetCouponsAsync } from './adminGetCouponsSlice';
import { setAdminGetLoading } from '../adminLoadingSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminPutCouponSlice = createSlice({
  name: 'adminPutCoupon',
  initialState: {
    tempCoupon: {
      title: '',
      is_enabled: 0,
      percent: 0,
      due_date: 0,
      code: '',
    },
    couponId: '',
  },
  reducers: {
    setTempCoupon(state, action) {
      const coupon = action.payload;
      state.tempCoupon = coupon;
      state.couponId = coupon.id;
    },
    setPutCouponInputChange: (state, action) => {
      const { value, name, checked, type } = action.payload;
      state.tempCoupon[name] = type === 'checkbox' ? checked : value;
    },
  },
});

export const adminPutCouponAsync = createAsyncThunk(
  'putCoupon/adminPutCoupon',
  async (_, { getState, dispatch }) => {
    const tempCoupon = getState().adminPutCoupon.tempCoupon;
    const id = getState().adminPutCoupon.couponId;
    const dateObject = new Date(tempCoupon.due_date);
    const data = {
      data: {
        ...tempCoupon,
        percent: Number(tempCoupon.percent),
        due_date: dateObject.getTime(),
        is_enabled: tempCoupon.is_enabled ? 1 : 0,
      },
    };
    dispatch(setAdminGetLoading(true));
    try {
      await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`,
        data
      );

      dispatch(adminGetCouponsAsync({}));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setAdminGetLoading(false));
    }
  }
);
export const { setTempCoupon, setPutCouponInputChange } =
  adminPutCouponSlice.actions;
export default adminPutCouponSlice.reducer;
