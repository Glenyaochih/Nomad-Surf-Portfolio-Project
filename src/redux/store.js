import { configureStore } from "@reduxjs/toolkit";
import adminLoginReducer from "./slice/adminLoginSlice";
import adminGetProductsReducer from './slice/adminGetProductsSlice'
import modalReducer from './slice/modalSlice'


export const store = configureStore({
  reducer:{
    adminLogin:adminLoginReducer,
    adminGetProducts:adminGetProductsReducer,
    modal:modalReducer
  }
})