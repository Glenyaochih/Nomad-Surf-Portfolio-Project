import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderAPI } from './orderAPI';
import { getCartAsync } from '../cart/cartSlice';
import { createAsyncMessage } from '../../message/messageSlice';

const initialState = {
  order: {},
  orderId: '',
  isOrderLoading: false,
  orderError: null,
  postOrderSuccess: false,
  deliveryFee: 0,
  discountTotal: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPostOrderSuccess: (state, action) => {
      state.postOrderSuccess = action.payload;
    },
    setDeliveryCost: (state, action) => {
      state.deliveryFee = action.payload;
    },
    setDiscountTotal: (state, action) => {
      state.discountTotal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      //送出訂單流程
      .addCase(postOrderAsync.pending, (state) => {
        state.isOrderLoading = true;
        state.orderError = null;
        state.postOrderSuccess = false;
      })
      .addCase(postOrderAsync.fulfilled, (state, action) => {
        state.postOrderSuccess = true;
        state.isOrderLoading = false;
        state.orderId = action.payload;
      })
      .addCase(postOrderAsync.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.postOrderSuccess = false;
        state.orderError = action.error.message;
      })
      //取得訂單
      .addCase(getOrderAsync.pending, (state) => {
        state.isOrderLoading = false;
        state.orderError = null;
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getOrderAsync.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderError = action.error.message;
      });
  },
});

export const postOrderAsync = createAsyncThunk(
  'order/postOrder',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await getOrderAPI.postOrder(data);
      dispatch(createAsyncMessage(res.data));
      dispatch(getCartAsync());
      return res.data.orderId;
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderAsync = createAsyncThunk(
  'order/getOrder',
  async (_, { dispatch, rejectWithValue, getState }) => {
    const id = getState().order.orderId;
    try {
      const res = await getOrderAPI.getOrder(id);
      console.log(res);
      dispatch(getCartAsync());
      return res.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { setPostOrderSuccess, setDeliveryCost, setDiscountTotal } =
  orderSlice.actions;
export default orderSlice.reducer;
