import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL= import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminGetProductsSlice = createSlice({
name:'adminGetProducts',
initialState:{
  products:[],
},
reducers:{
  setProducts:(state,action)=>{
    state.products=action.payload
  }
}
})

export const adminGetProductsAsync =createAsyncThunk(
  'getProducts/adminGetProducts',
  async(_,{dispatch})=>{
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page`);
      dispatch(adminGetProductsSlice.actions.setProducts(res.data.products))

    } catch (error) {
      error
    }
  }
)

export default adminGetProductsSlice.reducer