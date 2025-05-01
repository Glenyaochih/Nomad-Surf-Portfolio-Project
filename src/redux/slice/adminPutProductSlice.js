import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetProductsAsync } from './adminGetProductsSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminPostProductSlice = createSlice({
  name: 'adminPutProduct',
  initialState: {
    tempProduct: {
      product_num: '',
      category: '',
      colors: [],
      content: '',
      description: '',
      grade: '',
      hasDiscount: 0,
      imageUrl: '',
      imagesUrl: [''],
      is_enabled: 0,
      origin_price: '',
      price: '',
      sizes: [],
      fin_system: '',
      title: '',
      unit: '',
    },
    productId: '',
  },
  reducers: {
    setTempProduct(state, action) {
      const product = action.payload;
      state.tempProduct = product;
      state.productId = product.id;
    },
    setPutProductInputChange: (state, action) => {
      const { value, name, checked, type } = action.payload;
      state.tempProduct[name] = type === 'checkbox' ? checked : value;
    },
    setPutImagesInputChange: (state, action) => {
      const { value, index } = action.payload;
      const newImages = [...state.tempProduct.imagesUrl];
      newImages[index] = value;
      state.tempProduct.imagesUrl = newImages;
    },
    setPutSizesInputChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.tempProduct.sizes[index] = {
        ...state.tempProduct.sizes[index],
        [name]: value,
      };
    },
    setPutColorsInputChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.tempProduct.colors[index] = {
        ...state.tempProduct.colors[index],
        [name]: value,
      };
    },

    setPutAddSizeHandler: (state) => {
      const newSizes = [...state.tempProduct.sizes, { size: '', stock: 0 }];
      state.tempProduct.sizes = newSizes;
    },

    setPutAddColorHandler: (state) => {
      const newColors = [
        ...state.tempProduct.colors,
        { colorName: '', colorCode: '' },
      ];
      state.tempProduct.colors = newColors;
    },

    setPutAddImagesHandler: (state) => {
      const newImages = [...state.tempProduct.imagesUrl, ''];
      state.tempProduct.imagesUrl = newImages;
    },

    setPutDeleteImagesHandler: (state) => {
      const newImages = [...state.tempProduct.imagesUrl];
      newImages.pop();
      state.tempProduct.imagesUrl = newImages;
    },

    setPutDeleteSizeHandler: (state, action) => {
      const { index } = action.payload;
      const newSizes = [...state.tempProduct.sizes];
      newSizes.splice(index, 1);
      state.tempProduct.sizes = newSizes;
    },
    setPutDeleteColorHandler: (state, action) => {
      const { index } = action.payload;
      const newColors = [...state.tempProduct.colors];
      newColors.splice(index, 1);
      state.tempProduct.colors = newColors;
    },

    setUploadImageHandler: (state, action) => {
      state.tempProduct.imageUrl = action.payload;
    },

    setUploadImagesHandler: (state, action) => {
      const image = action.payload;
      const newImages = [...state.tempProduct.imagesUrl, image];
      state.tempProduct.imagesUrl = newImages;
    },
  },
});

export const adminPutProductAsync = createAsyncThunk(
  'putProduct/adminPutProduct',
  async (_, { getState, dispatch }) => {
    const tempProduct = getState().adminPutProduct.tempProduct;
    const id = getState().adminPutProduct.productId;
    const data = {
      data: {
        ...tempProduct,
        origin_price: Number(tempProduct.origin_price),
        price: Number(tempProduct.price),
        sizes: tempProduct.sizes.map((size) => ({
          ...size,
          stock: Number(size.stock),
        })),
        hasDiscount: tempProduct.hasDiscount ? 1 : 0,
        is_enabled: tempProduct.is_enabled ? 1 : 0,
      },
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`,
        data
      );
      console.log(res);
      dispatch(adminGetProductsAsync({}));
    } catch (error) {
      console.log(error);
    }
  }
);
export const {
  setTempProduct,
  setPutProductInputChange,
  setPutImagesInputChange,
  setPutAddImagesHandler,
  setPutDeleteImagesHandler,
  setUploadImageHandler,
  setUploadImagesHandler,
  setPutAddSizeHandler,
  setPutSizesInputChange,
  setPutDeleteSizeHandler,
  setPutAddColorHandler,
  setPutDeleteColorHandler,
  setPutColorsInputChange,
} = adminPostProductSlice.actions;
export default adminPostProductSlice.reducer;
