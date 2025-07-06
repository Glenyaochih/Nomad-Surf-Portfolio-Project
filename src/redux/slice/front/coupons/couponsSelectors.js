import { createSelector } from '@reduxjs/toolkit';

//第一層
const selectCouponsState = (state) => state.coupon;
//第二層
export const selectCouponLoading = createSelector(
  [selectCouponsState],
  (couponSlice) => couponSlice.isCouponLoading
);

//第三層
