import { createSelector } from '@reduxjs/toolkit';

//第一層引入
const selectOrderState = (state) => state.order;

//第二層
export const selectOrderSuccess = createSelector(
  [selectOrderState],
  (orderSlice) => orderSlice.postOrderSuccess
);

export const selectOrder = createSelector(
  [selectOrderState],
  (orderSlice) => orderSlice.order
);

export const selectDeliveryFee = createSelector(
  [selectOrderState],
  (orderSlice) => orderSlice.deliveryFee
);

export const selectDiscountTotal = createSelector(
  [selectOrderState],
  (orderSlice) => orderSlice.discountTotal
);
export const selectOrderId = createSelector(
  [selectOrderState],
  (orderSlice) => orderSlice.id
);
//第三層
