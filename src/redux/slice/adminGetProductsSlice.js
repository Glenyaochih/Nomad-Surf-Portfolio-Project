import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminGetProductsSlice = createSlice({
  name: 'adminGetProducts',
  initialState: {
    products: [],
    rangePages: [],
    pageState: {},
    currentPage: '',
    category: '',
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setProductsPagesRange: (state, action) => {
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

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setProductCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const adminGetProductsAsync = createAsyncThunk(
  'getProducts/adminGetProducts',
  async (params, { dispatch }) => {
    let url = params.category
      ? `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${params.page}&category=${params.category}`
      : `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${params.page}`;
    try {
      const res = await axios.get(url);
      dispatch(adminGetProductsSlice.actions.setProducts(res.data.products));
      console.log(res.data.products);
      dispatch(
        adminGetProductsSlice.actions.setProductsPagesRange(res.data.pagination)
      );
    } catch (error) {
      error;
    }
  }
);
export const { setCurrentPage, setProductCategory } =
  adminGetProductsSlice.actions;
export default adminGetProductsSlice.reducer;
