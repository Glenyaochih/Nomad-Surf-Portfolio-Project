import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaymentAPI } from './paymentAPI';

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
  async (id, { rejectWithValue }) => {
    try {
      const res = await getPaymentAPI.postPayment(id);
      console.log(res);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default paymentSlice.reducer;
