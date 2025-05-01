import { configureStore } from '@reduxjs/toolkit';
import adminLoginReducer from './slice/adminLoginSlice';
import adminGetProductsReducer from './slice/adminGetProductsSlice';
import modalReducer from './slice/modalSlice';
import adminPostProductReducer from './slice/adminPostProductSlice';
import adminUploadImageReducer from './slice/adminUploadImageSlice';
import adminDelProductReducer from './slice/adminDelProductSlice';
import adminPutProductReducer from './slice/adminPutProductSlice';

export const store = configureStore({
  reducer: {
    adminLogin: adminLoginReducer,
    adminGetProducts: adminGetProductsReducer,
    adminPostProduct: adminPostProductReducer,
    adminDelProducts: adminDelProductReducer,
    adminUploadImage: adminUploadImageReducer,
    adminPutProduct: adminPutProductReducer,
    modal: modalReducer,
  },
});
