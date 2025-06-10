import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetOrdersAsync } from './adminGetOrdersSlice';
import { setAdminGetLoading } from '../adminLoadingSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminDelOrdersSlice = createSlice({
  name: 'adminDelOrders',
  initialState: {
    idContainer: [],
  },
  reducers: {
    setDelOrdersInputChange: (state, action) => {
      const { checked, orderId } = action.payload;
      if (checked) {
        //加入id容器
        state.idContainer = [...state.idContainer, orderId];
      } else {
        //當勾選條件被重新觸發篩選
        state.idContainer = state.idContainer.filter((id) => id !== orderId);
      }
    },
  },
});

export const adminDelOrdersAsync = createAsyncThunk(
  'delOrders/adminDelOrders',

  async (_, { dispatch, getState }) => {
    const ordersId = getState().adminDelOrders.idContainer;

    ordersId.forEach(async (id) => {
      //forEach 為同步所以需要在迴圈體內等待非同步的API遍歷完成所以要再加上一個async
      try {
        dispatch(setAdminGetLoading(true));
        await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`);
        dispatch(adminGetOrdersAsync({ page: 1 }));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setAdminGetLoading(false));
      }
    });
  }
);

export const adminDelAllOrdersAsync = createAsyncThunk(
  'delAllOrders/adminDelAllOrders',
  async (_, { dispatch }) => {
    try {
      dispatch(setAdminGetLoading(true));
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/orders/all`);
      dispatch(adminGetOrdersAsync({ page: 1 }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setAdminGetLoading(false));
    }
  }
);
export const { setDelOrdersInputChange } = adminDelOrdersSlice.actions;
export default adminDelOrdersSlice.reducer;
