import { configureStore } from "@reduxjs/toolkit";
import adminLoginReducer from "./slice/adminLoginSlice";
import adminProductsReducer from './slice/adminProductsSlice'
import modalReducer from './slice/modalSlice'


export const store = configureStore({
  reducer:{
    adminLogin:adminLoginReducer,
    adminProducts:adminProductsReducer,
    modal:modalReducer
  }
})