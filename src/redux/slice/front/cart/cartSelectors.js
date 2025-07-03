import { createSelector } from '@reduxjs/toolkit';

//第一層
const selectCartState = (state) => state.cart;

//第二層
// 取得購物車資料
export const selectCart = createSelector([selectCartState], (state) => {
  return state.cartList;
});
//付款狀態
export const selectPaymentMethod = createSelector(
  [selectCartState],
  (state) => state.paymentMethod
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
