import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaymentAPI } from './paymentAPI';
import { createAsyncMessage } from '../../message/messageSlice';
import { getOrderAsync } from '../order/orderSlice';

const initialState = {
  isPaymentLoading: false,
  paymentError: null,
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postPaymentAsync.pending, (state) => {
        state.isPaymentLoading = true;
        state.paymentError = null;
      })
      .addCase(postPaymentAsync.fulfilled, (state) => {
        state.isPaymentLoading = false;
        state.paymentError = null;
      })
      .addCase(postPaymentAsync.rejected, (state, action) => {
        state.isPaymentLoading = false;
        state.paymentError = action.payload;
      });
  },
});

export const postPaymentAsync = createAsyncThunk(
  'payment/postPayment',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await getPaymentAPI.postPayment(id);
      await dispatch(getOrderAsync());
      dispatch(createAsyncMessage(res.data));
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export default paymentSlice.reducer;
