import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetCouponsAsync } from './adminGetCouponsSlice';
import { createAsyncMessage } from '../../message/messageSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminDelCouponsSlice = createSlice({
  name: 'adminDelCoupons',
  initialState: {
    idContainer: [],
  },
  reducers: {
    setDelCouponsInputChange: (state, action) => {
      const { checked, couponId } = action.payload;
      if (checked) {
        //加入id容器
        state.idContainer = [...state.idContainer, couponId];
      } else {
        //當勾選條件被重新觸發篩選
        state.idContainer = state.idContainer.filter((id) => id !== couponId);
      }
    },
  },
});

export const adminDelCouponsAsync = createAsyncThunk(
  'DelCoupons/adminDelCoupons',
  async (_, { dispatch, getState }) => {
    const couponsId = getState().adminDelCoupons.idContainer;
    couponsId.forEach(async (id) => {
      //forEach 為同步所以需要在迴圈體內等待非同步的API遍歷完成所以要再加上一個async
      try {
        const res = await axios.delete(
          `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`
        );
        dispatch(adminGetCouponsAsync({ page: 1 }));
        dispatch(createAsyncMessage(res.data));
      } catch (error) {
        dispatch(createAsyncMessage(error.response.data));
      }
    });
  }
);
export const { setDelCouponsInputChange } = adminDelCouponsSlice.actions;
export default adminDelCouponsSlice.reducer;
