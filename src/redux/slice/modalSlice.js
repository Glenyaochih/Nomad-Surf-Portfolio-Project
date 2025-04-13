import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    productModalOpen: false,
  },
  reducers: {
    setProductModalOpen(state, action) {
      state.productModalOpen = action.payload;
      console.log(action.payload)
    },
  },
});
export const { setProductModalOpen } = modalSlice.actions;
export default modalSlice.reducer;
