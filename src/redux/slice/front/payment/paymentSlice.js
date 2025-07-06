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
    builder;
  },
});

export const postPaymentAsync = createAsyncThunk(
  'payment/postPayment',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await getPaymentAPI.postPayment(id);
      dispatch(createAsyncMessage(res.data));
      dispatch(getOrderAsync());
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export default paymentSlice.reducer;
