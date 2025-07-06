import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCouponsAPI } from './couponsAPI';
import { getCartAsync } from '../cart/cartSlice';
import { createAsyncMessage } from '../../message/messageSlice';

const initialState = {
  isCouponLoading: false,
  couponError: null,
};

export const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCouponAsync.pending, (state) => {
        state.isCouponLoading = true;
        state.couponError = null;
      })
      .addCase(postCouponAsync.fulfilled, (state) => {
        state.isCouponLoading = false;
      })
      .addCase(postCouponAsync.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.couponError = action.error.message;
      });
  },
});

export const postCouponAsync = createAsyncThunk(
  'coupon/applyCoupon',
  async (couponCode, { dispatch, rejectWithValue }) => {
    const data = {
      data: {
        code: couponCode,
      },
    };
    try {
      const res = await getCouponsAPI.postCoupon(data);
      dispatch(createAsyncMessage(res.data));
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      rejectWithValue(error?.response?.data);
    }
  }
);

export default couponSlice.reducer;
