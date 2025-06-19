import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetProductsAsync } from './adminGetProductsSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const initialProductPostState = {
  product_num: '',
  category: '',
  colors: [{ colorName: '', colorCode: '' }],
  content: '',
  description: '',
  grade: '',
  hasDiscount: 0,
  imageUrl: '',
  imagesUrl: [''],
  is_enabled: 0,
  is_new_arrivals: 0,
  origin_price: '',
  price: '',
  sizes: [{ size: '', stock: 0 }],
  fin_system: '',
  title: '',
  unit: '',
  soldNum: 0,
};

export const adminPostProductSlice = createSlice({
  name: 'adminPostProduct',
  initialState: {
    initData: initialProductPostState,
  },
  reducers: {
    setPostProductInputChange: (state, action) => {
      const { value, name, checked, type } = action.payload;
      state.initData[name] = type === 'checkbox' ? checked : value;
    },
    setPostImagesInputChange: (state, action) => {
      const { value, index } = action.payload;
      const newImages = [...state.initData.imagesUrl];
      newImages[index] = value;
      state.initData.imagesUrl = newImages;
    },
    setPostSizesInputChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.initData.sizes[index] = {
        ...state.initData.sizes[index],
        [name]: value,
      };
    },
    setPostColorsInputChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.initData.colors[index] = {
        ...state.initData.colors[index],
        [name]: value,
      };
    },

    setPostAddSizeHandler: (state) => {
      const newSizes = [...state.initData.sizes, { size: '', stock: 0 }];
      state.initData.sizes = newSizes;
    },

    setPostAddColorHandler: (state) => {
      const newColors = [
        ...state.initData.colors,
        { colorName: '', colorCode: '' },
      ];

      state.initData.colors = newColors;
    },

    setPostAddImagesHandler: (state) => {
      const newImages = [...state.initData.imagesUrl, ''];
      state.initData.imagesUrl = newImages;
    },

    setPostDeleteImagesHandler: (state) => {
      const newImages = [...state.initData.imagesUrl];
      newImages.pop();
      state.initData.imagesUrl = newImages;
    },

    setPostDeleteSizeHandler: (state, action) => {
      const index = action.payload;
      console.log(index);
      const newSizes = [...state.initData.sizes];
      newSizes.splice(index, 1);
      state.initData.sizes = newSizes;
    },
    setPostDeleteColorHandler: (state, action) => {
      const index = action.payload;
      const newColors = [...state.initData.colors];
      newColors.splice(index, 1);
      state.initData.colors = newColors;
    },

    setUploadImageHandler: (state, action) => {
      state.initData.imageUrl = action.payload;
    },

    setUploadImagesHandler: (state, action) => {
      const image = action.payload;
      const newImages = [...state.initData.imagesUrl, image];
      state.initData.imagesUrl = newImages;
    },

    setResetProductInitialState: (state) => {
      state.initData = initialProductPostState; //清空輸入框
    },
  },
});

export const adminPostProductAsync = createAsyncThunk(
  'postProduct/adminPostProduct',
  async (_, { getState, dispatch }) => {
    const initData = getState().adminPostProduct.initData;
    const data = {
      data: {
        ...initData,
        origin_price: Number(initData.origin_price),
        price: Number(initData.price),
        soldNum: Number(initData.soldNum),
        sizes: initData.sizes.map((size) => ({
          ...size,
          stock: Number(size.stock),
        })),
        hasDiscount: initData.hasDiscount ? 1 : 0,
        is_enabled: initData.is_enabled ? 1 : 0,
        is_new_arrivals: initData.is_new_arrivals ? 1 : 0,
      },
    };
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`, data);
      dispatch(adminGetProductsAsync({}));
      dispatch(setResetProductInitialState());
    } catch (error) {
      console.log(error);
    }
  }
);
export const {
  setPostProductInputChange,
  setPostImagesInputChange,
  setPostAddImagesHandler,
  setPostDeleteImagesHandler,
  setUploadImageHandler,
  setUploadImagesHandler,
  setResetProductInitialState,
  setPostAddSizeHandler,
  setPostSizesInputChange,
  setPostDeleteSizeHandler,
  setPostAddColorHandler,
  setPostDeleteColorHandler,
  setPostColorsInputChange,
} = adminPostProductSlice.actions;
export default adminPostProductSlice.reducer;
