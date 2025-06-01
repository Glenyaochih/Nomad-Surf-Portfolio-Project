import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addProductModalOpen: false,
    checkProductModalOpen: {
      open: false,
      state: '',
      data: {},
    },
    editProductModalOpen: {
      open: false,
      state: '',
    },
    addCouponModalOpen: false,
  },
  reducers: {
    setAddProductModalOpen(state, action) {
      state.addProductModalOpen = action.payload;
    },
    setCheckProductOpen(state, action) {
      state.checkProductModalOpen.data = action.payload.data;
      state.checkProductModalOpen.open = action.payload.open;
      state.checkProductModalOpen.state = action.payload.state;
    },
    setEditProductOpen(state, action) {
      state.editProductModalOpen.open = action.payload.open;
      state.editProductModalOpen.state = action.payload.state;
    },
    setAddCouponModalOpen(state, action) {
      state.addCouponModalOpen = action.payload;
    },
  },
});
export const {
  setAddCouponModalOpen,
  setAddProductModalOpen,
  setCheckProductOpen,
  setEditProductOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
