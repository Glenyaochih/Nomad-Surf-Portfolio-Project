import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isScreenLoading: false,
    isAdminGetProductLoading: false,
  },
  reducers: {
    setScreenLoading: (state, action) => {
      state.isScreenLoading = action.payload;
    },
    setAdminGetProductLoading: (state, action) => {
      state.isAdminGetProductLoading = action.payload;
    },
  },
});
export const { setScreenLoading, setAdminGetProductLoading } =
  loadingSlice.actions;
export default loadingSlice.reducer;
