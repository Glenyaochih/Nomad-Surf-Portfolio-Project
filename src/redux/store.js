import { configureStore } from "@reduxjs/toolkit";
import adminLoginReducer from "./slice/adminLoginSlice";
import adminProductsReducer from './slice/adminProductsSlice'


export const store = configureStore({
  reducer:{
    adminLogin:adminLoginReducer,
    adminProducts:adminProductsReducer
  }
})