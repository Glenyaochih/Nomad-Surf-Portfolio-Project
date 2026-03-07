import { configureStore } from '@reduxjs/toolkit';
// === 後台管理 (Consolidated) ===
import adminAuthReducer from './slice/admin/auth/adminAuthSlice';
import adminProductsReducer from './slice/admin/products/adminProductsSlice';
import adminOrdersReducer from './slice/admin/orders/adminOrdersSlice';
import adminCouponsReducer from './slice/admin/coupons/adminCouponsSlice';
// === 前台管理 ===
import frontGetProductsReducer from './slice/front/products/frontProductsSlice';
import frontCartReducer from './slice/front/cart/cartSlice';
import couponReducer from './slice/front/coupons/couponsSlice';
import orderReducer from './slice/front/order/orderSlice';
import paymentReducer from './slice/front/payment/paymentSlice';
import usersReducer from './slice/front/user/userSlice';
import waveReducer from './slice/front/wave/waveSlice';
// === 元件控制 ===
import messageReducer from './slice/message/messageSlice';
import modalReducer from './slice/modalSlice';

export const store = configureStore({
  reducer: {
    // === 後台管理 (Consolidated) ===
    adminAuth: adminAuthReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
    adminCoupons: adminCouponsReducer,
    // === 前台管理 ===
    frontGetProducts: frontGetProductsReducer,
    cart: frontCartReducer,
    coupon: couponReducer,
    order: orderReducer,
    payment: paymentReducer,
    user: usersReducer,
    wave: waveReducer,
    // === 元件控制 ===
    modal: modalReducer,
    messages: messageReducer,
  },
});
