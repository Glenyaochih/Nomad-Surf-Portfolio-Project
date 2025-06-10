import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { setAdminGetLoading } from '../adminLoadingSlice';
import { adminGetOrdersAsync } from './adminGetOrdersSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminPutOrderSlice = createSlice({
  name: 'adminPutOrder',
  initialState: {
    tempOrder: {
      create_at: 0,
      is_paid: false,
      message: '',
      products: {},
      user: {
        address: '',
        email: '',
        name: '',
        tel: '',
      },
      num: 0,
    },
    orderId: '',
  },
  reducers: {
    setTempOrder(state, action) {
      const order = action.payload;
      state.tempOrder = order;
      state.orderId = order.id;
    },
    setPutOrderInputChange: (state, action) => {
      const { value, name, checked, type, userType } = action.payload;
      userType === 'user'
        ? (state.tempOrder.user[name] = type === 'checkbox' ? checked : value)
        : (state.tempOrder[name] = type === 'checkbox' ? checked : value);
    },
  },
});

export const adminPutOrderAsync = createAsyncThunk(
  'putOrder/adminPutOrder',
  async (_, { getState, dispatch }) => {
    const tempOrder = getState().adminPutOrder.tempOrder;
    const id = getState().adminPutOrder.orderId;

    const data = {
      data: {
        ...tempOrder,
      },
    };
    dispatch(setAdminGetLoading(true));
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`, data);

      dispatch(adminGetOrdersAsync({}));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setAdminGetLoading(false));
    }
  }
);
export const { setTempOrder: setTempOrder, setPutOrderInputChange } =
  adminPutOrderSlice.actions;
export default adminPutOrderSlice.reducer;
