import { createSelector } from '@reduxjs/toolkit';

//第一層
const selectCartState = (state) => state.cart;

//第一層
export const selectCart = createSelector([selectCartState], (state) => {
  return state.cartList;
});
