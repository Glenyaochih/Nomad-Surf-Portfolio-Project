import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { frontGetCartAPI } from './CartAPI';

const initialState = {
  cartList: {},
  isCartLoading: false,
  cartError: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //加入購物車
      .addCase(postCartAsync.pending, (state) => {
        state.isCartLoading = true;
        state.cartError = null;
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
        state.cartList = action.payload;
        state.isCartLoading = false;
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.isCartLoading = false;
        state.cartError = action.error.message;
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
      await frontGetCartAPI.postCart(data);
      dispatch(getCartAsync());
    } catch (error) {
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
      await frontGetCartAPI.putCart(param.cartId, data);
      dispatch(getCartAsync());
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
//刪除購物車
export const delCartAsync = createAsyncThunk(
  'cart/delCart',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await frontGetCartAPI.deleteSingleCart(id);
      dispatch(getCartAsync());
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//清空購物車
export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await frontGetCartAPI.clearCart();
      dispatch(getCartAsync());
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export default cartSlice.reducer;
