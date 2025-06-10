import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isScreenLoading: false,
    isAdminLoading: false,
  },
  reducers: {
    setScreenLoading: (state, action) => {
      state.isScreenLoading = action.payload;
    },
    setAdminGetLoading: (state, action) => {
      state.isAdminLoading = action.payload;
    },
  },
});
export const { setScreenLoading, setAdminGetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
