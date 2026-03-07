import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWaveAPI } from './waveAPI';
import { SURF_SPOTS } from './waveSelectors';

const initialState = {
    waveData: null,
    isWaveLoading: false,
    waveError: null,
    selectedSpotId: SURF_SPOTS[0].id,
    selectedDate: null, // null 代表即時資料
};

// Async Thunk
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
    reducers: {
        setSelectedSpotId: (state, action) => {
            state.selectedSpotId = action.payload;
            state.selectedDate = null; // 切換浪點時切回即時
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        }
    },
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

export const { setSelectedSpotId, setSelectedDate } = waveSlice.actions;

export default waveSlice.reducer;
