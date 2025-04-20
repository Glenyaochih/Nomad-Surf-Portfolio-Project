import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addProductModalOpen: false,
    checkAndEditProductModalOpen: {
      open: false,
      state: '',
      data: [],
    },
  },
  reducers: {
    setAddProductModalOpen(state, action) {
      state.addProductModalOpen = action.payload;
    },
    setCheckAndEditProductOpen(state, action) {
      state.checkAndEditProductModalOpen.open = action.payload.open;
      state.checkAndEditProductModalOpen.data = action.payload.data;
      state.checkAndEditProductModalOpen.state = action.payload.state;
    },
  },
});
export const { setAddProductModalOpen, setCheckAndEditProductOpen } =
  modalSlice.actions;
export default modalSlice.reducer;
