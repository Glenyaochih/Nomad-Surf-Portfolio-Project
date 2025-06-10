import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { frontGetProductsAPI } from './frontProductsAPI';

const initialState = {
  products: [],
  isProductsLoading: false,
  productsError: null,
  product: '',
  isProductLoading: false,
  productError: null,
  filters: {
    filterOffcanvasOpen: false,
    tempFilters: {
      grades: [],
      finSystem: '',
      priceRange: { min: 0, max: Infinity },
      size: '',
    },
    activeFilters: {
      grades: [],
      finSystem: '',
      priceRange: { min: 0, max: Infinity },
      size: '',
    },
    sortOption: 'best-selling',
  },
};

export const getProductsSlice = createSlice({
  name: 'frontGetProducts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters.tempFilters[filterType] = value;
    },
    setApplyFilter: (state) => {
      //當點擊套用篩選按鈕時將tempFilter塞入activeFilters
      state.filters.activeFilters = state.filters.tempFilters;
    },
    setResetFilters: (state) => {
      //清除篩選器
      state.filters.tempFilters = initialState.filters.tempFilters;
      state.filters.activeFilters = initialState.filters.activeFilters;
    },
    setFilterOffcanvasToggle: (state, action) => {
      state.filters.filterOffcanvasOpen = action.payload;
    },
    setSortOption: (state, action) => {
      const { sortOption } = action.payload;
      state.filters.sortOption = sortOption;
    },
  },

  extraReducers: (builder) => {
    builder
      // === 取得所有產品 ===
      .addCase(getProductsAsync.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsLoading = false;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.error.message;
      })
      // === 取得單一產品 ===
      .addCase(getSingleProductsAsync.pending, (state) => {
        state.isProductLoading = true;
        state.productError = null;
      })
      .addCase(getSingleProductsAsync.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      })
      .addCase(getSingleProductsAsync.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.error.message;
      });
  },
});

export const getProductsAsync = createAsyncThunk(
  'products/frontGetProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await frontGetProductsAPI.getProducts();
      return res.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getSingleProductsAsync = createAsyncThunk(
  'product/frontGetSingleProducts',
  async (id, { rejectWithValue }) => {
    try {
      const res = await frontGetProductsAPI.getSingleProducts(id);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// export const {} = getProductsSlice.actions;
export const {
  setFilter,
  setSortOption,
  setApplyFilter,
  setResetFilters,
  setFilterOffcanvasToggle,
} = getProductsSlice.actions;
export default getProductsSlice.reducer;
