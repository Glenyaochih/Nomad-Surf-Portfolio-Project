import { createSelector } from '@reduxjs/toolkit';

//第一層建立一個基礎 selector指向 slice usersSlice.js
const selectUserState = (state) => state.user;
//第二層
//user是否登入
export const selectUserLogin = createSelector(
  [selectUserState],
  (state) => state.isUserLogin
);
//user載入狀態
export const selectUserLoading = createSelector(
  [selectUserState],
  (state) => state.isUserLoading
);
//是否為會員
export const selectIsMember = createSelector(
  [selectUserState],
  (state) => state.isMember
);
//取得user 資料
export const selectUser = createSelector(
  [selectUserState],
  (state) => state.user
);
