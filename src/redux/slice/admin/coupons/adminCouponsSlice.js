import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAsyncMessage } from '../../message/messageSlice';
import { setAdminGetLoading } from '../auth/adminAuthSlice';
import { adminCouponsAPI } from './adminCouponsAPI';

const initialCouponState = {
    title: '',
    is_enabled: 0,
    percent: 0,
    due_date: 0,
    code: '',
};

export const adminCouponsSlice = createSlice({
    name: 'adminCoupons',
    initialState: {
        coupons: [],
        rangePages: [],
        pageState: {},
        currentPage: '',
        // 用於建立新優惠券
        initData: initialCouponState,
        // 用於更新優惠券
        tempCoupon: { ...initialCouponState },
        couponId: '',
        // 用於刪除優惠券
        idContainer: [],
    },
    reducers: {
        // ===== 取得優惠券 Reducers =====
        setCoupons: (state, action) => {
            state.coupons = action.payload;
        },
        setCouponsPagesRange: (state, action) => {
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
        setCouponsCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        // ===== 新增優惠券 Reducers =====
        setPostCouponInputChange: (state, action) => {
            const { value, name, checked, type } = action.payload;
            state.initData[name] = type === 'checkbox' ? checked : value;
        },
        setResetCouponInitialState: (state) => {
            state.initData = initialCouponState;
        },

        // ===== 更新優惠券 Reducers =====
        setTempCoupon(state, action) {
            const coupon = action.payload;
            state.tempCoupon = coupon;
            state.couponId = coupon.id;
        },
        setPutCouponInputChange: (state, action) => {
            const { value, name, checked, type } = action.payload;
            state.tempCoupon[name] = type === 'checkbox' ? checked : value;
        },

        // ===== 刪除優惠券 Reducers =====
        setDelCouponsInputChange: (state, action) => {
            const { checked, couponId } = action.payload;
            if (checked) {
                state.idContainer = [...state.idContainer, couponId];
            } else {
                state.idContainer = state.idContainer.filter((id) => id !== couponId);
            }
        },
    },
});

// ===== 非同步 Actions (Async Thunks) =====

// 取得優惠券（含分頁）
export const getCouponsAsync = createAsyncThunk(
    'coupons/getCoupons',
    async (params = {}, { dispatch }) => {
        const { page = 1, skipLoading = false } = params;
        if (!skipLoading) {
            dispatch(setAdminGetLoading(true));
        }
        try {
            const res = await adminCouponsAPI.getCoupons(page);
            dispatch(adminCouponsSlice.actions.setCoupons(res.data.coupons));
            dispatch(
                adminCouponsSlice.actions.setCouponsPagesRange(res.data.pagination)
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

// 建立新優惠券
export const createCouponAsync = createAsyncThunk(
    'coupons/createCoupon',
    async (_, { getState, dispatch }) => {
        const initData = getState().adminCoupons.initData;
        const dateObject = new Date(initData.due_date);
        const data = {
            data: {
                ...initData,
                percent: Number(initData.percent),
                due_date: dateObject.getTime(),
                is_enabled: initData.is_enabled ? 1 : 0,
            },
        };
        dispatch(setAdminGetLoading(true));
        try {
            await adminCouponsAPI.createCoupon(data);
            await dispatch(getCouponsAsync({ skipLoading: true }));
            dispatch(adminCouponsSlice.actions.setResetCouponInitialState());
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// 更新優惠券
export const updateCouponAsync = createAsyncThunk(
    'coupons/updateCoupon',
    async (_, { getState, dispatch }) => {
        const tempCoupon = getState().adminCoupons.tempCoupon;
        const id = getState().adminCoupons.couponId;
        const dateObject = new Date(tempCoupon.due_date);
        const data = {
            data: {
                ...tempCoupon,
                percent: Number(tempCoupon.percent),
                due_date: dateObject.getTime(),
                is_enabled: tempCoupon.is_enabled ? 1 : 0,
            },
        };
        dispatch(setAdminGetLoading(true));
        try {
            await adminCouponsAPI.updateCoupon(id, data);
            await dispatch(getCouponsAsync({ skipLoading: true }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// 刪除優惠券（多筆）
export const deleteCouponsAsync = createAsyncThunk(
    'coupons/deleteCoupons',
    async (_, { dispatch, getState }) => {
        const couponsId = getState().adminCoupons.idContainer;
        dispatch(setAdminGetLoading(true));
        try {
            const deletePromises = couponsId.map((id) => adminCouponsAPI.deleteCoupon(id));
            const results = await Promise.all(deletePromises);

            // 顯示最後一筆結果的成功訊息
            if (results.length > 0) {
                dispatch(createAsyncMessage(results[results.length - 1].data));
            }

            await dispatch(getCouponsAsync({ page: 1, skipLoading: true }));
        } catch (error) {
            if (error.response) {
                dispatch(createAsyncMessage(error.response.data));
            } else {
                console.error(error)
            }
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// 匯出 Actions
export const {
    setCouponsCurrentPage,
    setPostCouponInputChange,
    setResetCouponInitialState,
    setTempCoupon,
    setPutCouponInputChange,
    setDelCouponsInputChange,
} = adminCouponsSlice.actions;

export default adminCouponsSlice.reducer;
