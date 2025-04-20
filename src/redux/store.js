import { configureStore } from '@reduxjs/toolkit';
import adminLoginReducer from './slice/adminLoginSlice';
import adminGetProductsReducer from './slice/adminGetProductsSlice';
import modalReducer from './slice/modalSlice';
import adminPostProductReducer from './slice/adminPostProductSlice';
import adminUploadImageReducer from './slice/adminUploadImageSlice';

export const store = configureStore({
  reducer: {
    adminLogin: adminLoginReducer,
    adminGetProducts: adminGetProductsReducer,
    adminPostProduct: adminPostProductReducer,
    adminUploadImage: adminUploadImageReducer,
    modal: modalReducer,
  },
});
