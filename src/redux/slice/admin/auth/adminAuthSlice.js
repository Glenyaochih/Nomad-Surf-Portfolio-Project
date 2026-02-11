import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncMessage } from '../../message/messageSlice';
import { adminAuthAPI } from './adminAuthAPI';

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        account: {
            username: '',
            password: '',
        },
        isManagementPageOpen: false,
        isScreenLoading: false,
        isAdminLoading: false,
    },
    reducers: {
        setAccount: (state, action) => {
            const { value, name } = action.payload;
            state.account[name] = value;
        },
        setIsManagementOpen: (state, action) => {
            state.isManagementPageOpen = action.payload;
        },
        setScreenLoading: (state, action) => {
            state.isScreenLoading = action.payload;
        },
        setAdminGetLoading: (state, action) => {
            state.isAdminLoading = action.payload;
        },
    },
});

// Login async thunk
export const loginAsync = createAsyncThunk(
    'auth/login',
    async (_, { dispatch, getState, rejectWithValue }) => {
        dispatch(adminAuthSlice.actions.setScreenLoading(true));
        try {
            const account = getState().adminAuth.account;
            const res = await adminAuthAPI.login(account);
            dispatch(createAsyncMessage(res.data));
            const { token, expired } = res.data;
            document.cookie = `nomadsToken=${token}; expires=${new Date(expired)}`;
            axios.defaults.headers.common['Authorization'] = token;
            dispatch(adminAuthSlice.actions.setIsManagementOpen(true));
        } catch (error) {
            if (error.response) {
                dispatch(createAsyncMessage(error.response.data));
            } else {
                return rejectWithValue(error.message);
            }
        } finally {
            dispatch(adminAuthSlice.actions.setScreenLoading(false));
        }
    }
);

// Logout async thunk
export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await adminAuthAPI.logout();
            dispatch(adminAuthSlice.actions.setIsManagementOpen(false));
            return res.data;
        } catch (error) {
            if (error.response) {
                dispatch(createAsyncMessage(error.response.data));
            } else {
                return rejectWithValue(error.message);
            }

        }
    }
);

// Check auth status async thunk
export const checkAuthStatusAsync = createAsyncThunk(
    'auth/checkStatus',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(adminAuthSlice.actions.setScreenLoading(true));
        try {
            await adminAuthAPI.checkAuth();
            dispatch(adminAuthSlice.actions.setIsManagementOpen(true));
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(adminAuthSlice.actions.setScreenLoading(false));
        }
    }
);

export const {
    setAccount,
    setIsManagementOpen,
    setScreenLoading,
    setAdminGetLoading,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
