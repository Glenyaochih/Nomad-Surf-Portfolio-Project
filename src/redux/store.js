import { configureStore } from '@reduxjs/toolkit';
import adminLoginReducer from './slice/admin/adminLoginSlice';
import adminGetProductsReducer from './slice/admin/adminGetProductsSlice';
import adminPostProductReducer from './slice/admin/adminPostProductSlice';
import adminUploadImageReducer from './slice/admin/adminUploadImageSlice';
import adminDelProductReducer from './slice/admin/adminDelProductSlice';
import adminPutProductReducer from './slice/admin/adminPutProductSlice';
import adminLogoutReducer from './slice/admin/adminLogoutSlice';
import modalReducer from './slice/modalSlice';
import loadingReducer from './slice/loadingSlice';

export const store = configureStore({
  reducer: {
    adminLogin: adminLoginReducer,
    adminLogout: adminLogoutReducer,
    adminGetProducts: adminGetProductsReducer,
    adminPostProduct: adminPostProductReducer,
    adminDelProducts: adminDelProductReducer,
    adminUploadImage: adminUploadImageReducer,
    adminPutProduct: adminPutProductReducer,
    modal: modalReducer,
    loading: loadingReducer,
  },
});
