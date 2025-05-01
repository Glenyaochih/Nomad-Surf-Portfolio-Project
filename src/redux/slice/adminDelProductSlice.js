import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetProductsAsync } from './adminGetProductsSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminDelProductSlice = createSlice({
  name: 'adminDelProducts',
  initialState: {
    idContainer: [],
  },
  reducers: {
    setDelProductInputChange: (state, action) => {
      const { checked, productId } = action.payload;
      if (checked) {
        state.idContainer = [...state.idContainer, productId];
      } else {
        state.idContainer = state.idContainer.filter((id) => id !== productId);
      }
    },
  },
});

export const adminDelProductsAsync = createAsyncThunk(
  'DelProduct/adminDelProducts',
  async (_, { dispatch, getState }) => {
    const productsId = getState().adminDelProducts.idContainer;
    productsId.forEach(async (id) => {
      //forEach 為同步所以需要在迴圈體內等待非同步的API遍歷完成所以要再加上一個async
      try {
        const res = await axios.delete(
          `${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`
        );
        console.log(res);
        dispatch(adminGetProductsAsync({ page: 1, category: '' }));
      } catch (error) {
        console.log(error);
      }
    });
  }
);
export const { setDelProductInputChange } = adminDelProductSlice.actions;
export default adminDelProductSlice.reducer;
