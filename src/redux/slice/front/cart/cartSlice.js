import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { frontGetCartAPI } from './CartAPI';
import { createAsyncMessage } from '../../message/messageSlice';

const initialState = {
  cartList: {},
  isCartLoading: false,
  isAddCartSuccess: false,
  cartError: null,
  paymentMethod: 'cashOnDelivery',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //加入購物車
      .addCase(postCartAsync.pending, (state) => {
        state.isCartLoading = true;

        state.cartError = null;
      })
      .addCase(postCartAsync.fulfilled, (state) => {
        state.isCartLoading = false;
      })
      .addCase(postCartAsync.rejected, (state, action) => {
        state.isCartLoading = false;
        state.cartError = action.error.message;
      })

      //取得購物車
      .addCase(getCartAsync.pending, (state) => {
        state.isCartLoading = true;
        state.cartError = null;
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.cartList = {
          ...action.payload,
          total: Number(action.payload.total) || 0,
          final_total: Number(action.payload.final_total) || 0,
        };
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.isCartLoading = false;
        state.cartError = action.error.message;
        state.cartList = {};
      })
      //修改購物車
      .addCase(putCartAsync.pending, (state) => {
        state.isCartLoading = true;
        state.cartError = null;
      })
      .addCase(putCartAsync.fulfilled, (state) => {
        state.isCartLoading = false;
      })
      .addCase(putCartAsync.rejected, (state, action) => {
        state.isCartLoading = false;
        state.cartError = action.error.message;
      })
      //刪除購物車
      .addCase(delCartAsync.pending, (state) => {
        state.isCartLoading = true;
        state.cartError = null;
      })
      .addCase(delCartAsync.fulfilled, (state) => {
        state.isCartLoading = false;
      })
      .addCase(delCartAsync.rejected, (state, action) => {
        state.isCartLoading = false;
        state.cartError = action.error.message;
      });
  },
});
//加入購物車
export const postCartAsync = createAsyncThunk(
  'cart/postCart',
  async (param, { dispatch, rejectWithValue }) => {
    const data = {
      data: {
        product_id: param.product_id,
        qty: 1,
        size: param.size,
        color: param.color,
      },
    };
    try {
      const res = await frontGetCartAPI.postCart(data);
      dispatch(createAsyncMessage(res.data));
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error.response?.data);
    }
  }
);
//取得購物車
export const getCartAsync = createAsyncThunk(
  'cart/getCArt',
  async (_, { rejectWithValue }) => {
    try {
      const res = await frontGetCartAPI.getCart();
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//修改購物車
export const putCartAsync = createAsyncThunk(
  'cart/putCart',
  async (param, { dispatch, rejectWithValue }) => {
    const data = {
      data: {
        product_id: param.product_id,
        qty: parseInt(param.qty),
      },
    };
    try {
      const res = await frontGetCartAPI.putCart(param.cartId, data);
      dispatch(createAsyncMessage(res.data));
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error.response?.data);
    }
  }
);
//刪除購物車
export const delCartAsync = createAsyncThunk(
  'cart/delCart',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await frontGetCartAPI.deleteSingleCart(id);
      dispatch(createAsyncMessage(res.data));
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error?.response?.data);
    }
  }
);

//清空購物車
export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await frontGetCartAPI.clearCart();
      dispatch(createAsyncMessage(res.data));
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      return rejectWithValue(error?.response?.data);
    }
  }
);
//套用折價卷
export const { setPaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
