import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAdminGetLoading } from '../adminLoadingSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminGetOrdersSlice = createSlice({
  name: 'adminGetOrders',
  initialState: {
    orders: [],
    rangePages: [],
    pageState: {},
    currentPage: '',
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setOrdersPagesRange: (state, action) => {
      const { current_page, total_pages } = action.payload;
      const range = [];
      const maxDisplayPages = 3;
      let start = Math.max(1, current_page - Math.floor(maxDisplayPages / 2));
      let end = Math.min(total_pages, start + maxDisplayPages - 1);
      if (end - start < maxDisplayPages - 1) {
        start = Math.max(1, end - maxDisplayPages - 1);
      }
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      state.rangePages = range;
      state.pageState = action.payload;
    },

    setOrdersCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const adminGetOrdersAsync = createAsyncThunk(
  'getOrders/adminGetOrders',
  async (params, { dispatch }) => {
    dispatch(setAdminGetLoading(true));
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${params.page}`
      );
      dispatch(adminGetOrdersSlice.actions.setOrders(res.data.orders));

      dispatch(
        adminGetOrdersSlice.actions.setOrdersPagesRange(res.data.pagination)
      );
    } catch (error) {
      error;
    } finally {
      dispatch(setAdminGetLoading(false));
    }
  }
);
export const { setOrdersCurrentPage, setProductCategory } =
  adminGetOrdersSlice.actions;
export default adminGetOrdersSlice.reducer;
