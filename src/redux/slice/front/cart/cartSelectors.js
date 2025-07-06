import { createSelector } from '@reduxjs/toolkit';

//第一層
const selectCartState = (state) => state.cart;

//第二層
// 取得購物車資料
export const selectCart = createSelector([selectCartState], (cartSlice) => {
  return cartSlice.cartList;
});
//付款狀態
export const selectPaymentMethod = createSelector(
  [selectCartState],
  (cartSlice) => cartSlice.paymentMethod
);
//cartLoading 狀態
export const selectCartLoading = createSelector(
  [selectCartState],
  (cartSlice) => cartSlice.isCartLoading
);

//第三層
export const selectDeliveryFee = createSelector([selectCart], (cartList) => {
  const deliveryFeeCost = {
    shortBoard: 500,
    longBoard: 500,
    midLength: 500,
  };
  if (cartList.carts && cartList.carts.length > 0) {
    const totalDeliveryFee = cartList.carts.reduce((accumulator, cart) => {
      const category = cart.product.category;
      const cost = deliveryFeeCost[category] * cart.qty || 0;
      return accumulator + cost;
    }, 0);
    return totalDeliveryFee;
  } else {
    return 0;
  }
});
