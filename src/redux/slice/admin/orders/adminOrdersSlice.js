import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setAdminGetLoading } from '../auth/adminAuthSlice';
import { adminOrdersAPI } from './adminOrdersAPI';

export const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: [],
        rangePages: [],
        pageState: {},
        currentPage: '',
        // For updating order
        tempOrder: {
            create_at: 0,
            is_paid: false,
            message: '',
            products: {},
            user: {
                address: '',
                email: '',
                name: '',
                tel: '',
            },
            num: 0,
        },
        orderId: '',
        // For deleting orders
        idContainer: [],
    },
    reducers: {
        // ===== GET Orders Reducers =====
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setOrdersPagesRange: (state, action) => {
            const { current_page, total_pages } = action.payload;
            const range = [];
            const maxDisplayPages = 3;
            let start = Math.max(1, current_page - Math.floor(maxDisplayPages / 2));
            let end = Math.min(total_pages, start + maxDisplayPages - 1);
            if (end - start < maxDisplayPages - 1) {
                start = Math.max(1, end - maxDisplayPages - 1);
            }
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            state.rangePages = range;
            state.pageState = action.payload;
        },
        setOrdersCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        // ===== PUT Order Reducers =====
        setTempOrder(state, action) {
            const order = action.payload;
            state.tempOrder = order;
            state.orderId = order.id;
        },
        setPutOrderInputChange: (state, action) => {
            const { value, name, checked, type, userType } = action.payload;
            userType === 'user'
                ? (state.tempOrder.user[name] = type === 'checkbox' ? checked : value)
                : (state.tempOrder[name] = type === 'checkbox' ? checked : value);
        },

        // ===== DELETE Orders Reducers =====
        setDelOrdersInputChange: (state, action) => {
            const { checked, orderId } = action.payload;
            if (checked) {
                state.idContainer = [...state.idContainer, orderId];
            } else {
                state.idContainer = state.idContainer.filter((id) => id !== orderId);
            }
        },
    },
});

// ===== Async Thunks =====

// Get orders with pagination
export const getOrdersAsync = createAsyncThunk(
    'orders/getOrders',
    async (params = {}, { dispatch }) => {
        const { page = 1, skipLoading = false } = params;
        if (!skipLoading) {
            dispatch(setAdminGetLoading(true));
        }
        try {
            const res = await adminOrdersAPI.getOrders(page);
            dispatch(adminOrdersSlice.actions.setOrders(res.data.orders));
            dispatch(
                adminOrdersSlice.actions.setOrdersPagesRange(res.data.pagination)
            );
        } catch (error) {
            console.error(error);
        } finally {
            if (!skipLoading) {
                dispatch(setAdminGetLoading(false));
            }
        }
    }
);

// Update order
export const updateOrderAsync = createAsyncThunk(
    'orders/updateOrder',
    async (_, { getState, dispatch }) => {
        const tempOrder = getState().adminOrders.tempOrder;
        const id = getState().adminOrders.orderId;

        const data = {
            data: {
                ...tempOrder,
            },
        };
        dispatch(setAdminGetLoading(true));
        try {
            await adminOrdersAPI.updateOrder(id, data);
            await dispatch(getOrdersAsync({ skipLoading: true }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// Delete orders (multiple)
export const deleteOrdersAsync = createAsyncThunk(
    'orders/deleteOrders',
    async (_, { dispatch, getState }) => {
        const ordersId = getState().adminOrders.idContainer;
        dispatch(setAdminGetLoading(true));
        try {
            const deletePromises = ordersId.map((id) => adminOrdersAPI.deleteOrder(id));
            await Promise.all(deletePromises);
            await dispatch(getOrdersAsync({ page: 1, skipLoading: true }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// Delete all orders
export const deleteAllOrdersAsync = createAsyncThunk(
    'orders/deleteAllOrders',
    async (_, { dispatch }) => {
        try {
            dispatch(setAdminGetLoading(true));
            await adminOrdersAPI.deleteAllOrders();
            await dispatch(getOrdersAsync({ page: 1, skipLoading: true }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// Export actions
export const {
    setOrdersCurrentPage,
    setTempOrder,
    setPutOrderInputChange,
    setDelOrdersInputChange,
} = adminOrdersSlice.actions;

export default adminOrdersSlice.reducer;
