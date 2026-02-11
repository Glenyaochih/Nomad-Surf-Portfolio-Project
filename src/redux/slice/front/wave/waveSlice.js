import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWaveAPI } from './waveAPI';

const initialState = {
    waveData: null,
    isWaveLoading: false,
    waveError: null,
};

// Async Thunk: 接收 { lat, lon }
export const getWaveDataAsync = createAsyncThunk(
    'wave/getWaveData',
    async ({ lat, lon }, { rejectWithValue }) => {
        try {
            const res = await getWaveAPI.getWaveData(lat, lon);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const waveSlice = createSlice({
    name: 'wave',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWaveDataAsync.pending, (state) => {
                state.isWaveLoading = true;
                state.waveError = null;
            })
            .addCase(getWaveDataAsync.fulfilled, (state, action) => {
                state.isWaveLoading = false;
                state.waveData = action.payload;
            })
            .addCase(getWaveDataAsync.rejected, (state, action) => {
                state.isWaveLoading = false;
                state.waveError = action.payload;
            });
    },
});

export default waveSlice.reducer;
