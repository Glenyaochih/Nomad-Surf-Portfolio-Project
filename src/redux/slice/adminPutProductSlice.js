import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminGetProductsAsync } from './adminGetProductsSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminPostProductSlice = createSlice({
  name: 'adminPostProduct',
  initialState: {
    initData: [],
  },
  reducers: {
    setPutProductInputChange: (state, action) => {
      const { value, name, checked, type } = action.payload;
      state.initData[name] = type === 'checkbox' ? checked : value;
    },
    setPutImagesInputChange: (state, action) => {
      const { value, index } = action.payload;
      const newImages = [...state.initData.imagesUrl];
      newImages[index] = value;
      state.initData.imagesUrl = newImages;
    },
    setPutSizesInputChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.initData.sizes[index] = {
        ...state.initData.sizes[index],
        [name]: value,
      };
    },
    setPutColorsInputChange: (state, action) => {
      const { name, value, index } = action.payload;
      state.initData.colors[index] = {
        ...state.initData.colors[index],
        [name]: value,
      };
    },

    setPutAddSizeHandler: (state) => {
      const newSizes = [...state.initData.sizes, { size: '', stock: 0 }];
      state.initData.sizes = newSizes;
    },

    setPutAddColorHandler: (state) => {
      const newColors = [
        ...state.initData.colors,
        { colorName: '', colorCode: '' },
      ];
      state.initData.colors = newColors;
    },

    setPutAddImagesHandler: (state) => {
      const newImages = [...state.initData.imagesUrl, ''];
      state.initData.imagesUrl = newImages;
    },

    setPutDeleteImagesHandler: (state) => {
      const newImages = [...state.initData.imagesUrl];
      newImages.pop();
      state.initData.imagesUrl = newImages;
    },

    setPutDeleteSizeHandler: (state, action) => {
      const { index } = action.payload;
      const newSizes = [...state.initData.sizes];
      newSizes.pop(index);
      state.initData.sizes = newSizes;
    },
    setPutDeleteColorHandler: (state, action) => {
      const { index } = action.payload;
      const newColors = [...state.initData.colors];
      newColors.pop(index);
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
      state.initData = ''; //清空輸入框
    },
  },
});

export const adminPutProductAsync = createAsyncThunk(
  'postProduct/adminPostProduct',
  async (_, { getState, dispatch }) => {
    const initData = getState().adminPostProduct.initData;
    const data = {
      data: {
        ...initData,
        origin_price: Number(initData.origin_price),
        price: Number(initData.price),
        sizes: initData.sizes.map((size) => ({
          ...size,
          stock: Number(size.stock),
        })),
        hasDiscount: initData.hasDiscount ? 1 : 0,
        is_enabled: initData.is_enabled ? 1 : 0,
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product${id}`,
        data
      );
      dispatch(adminGetProductsAsync());
      dispatch(setResetProductInitialState());
      console.log(res);
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
