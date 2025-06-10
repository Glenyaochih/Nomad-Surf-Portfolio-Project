import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAdminGetLoading } from '../adminLoadingSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminGetCouponsSlice = createSlice({
  name: 'adminGetCoupons',
  initialState: {
    coupons: [],
    rangePages: [],
    pageState: {},
    currentPage: '',
  },
  reducers: {
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },

    setCouponsPagesRange: (state, action) => {
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

    setCouponsCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const adminGetCouponsAsync = createAsyncThunk(
  'getCoupons/adminGetCoupons',
  async (params, { dispatch }) => {
    dispatch(setAdminGetLoading(true));
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${params.page}`
      );
      console.log(res);
      dispatch(adminGetCouponsSlice.actions.setCoupons(res.data.coupons));

      dispatch(
        adminGetCouponsSlice.actions.setCouponsPagesRange(res.data.pagination)
      );
    } catch (error) {
      error;
    } finally {
      dispatch(setAdminGetLoading(false));
    }
  }
);
export const { setCouponsCurrentPage, setProductCategory } =
  adminGetCouponsSlice.actions;
export default adminGetCouponsSlice.reducer;
