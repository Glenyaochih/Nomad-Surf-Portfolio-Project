import { createSelector } from '@reduxjs/toolkit';

//第一層;
const selectMessagesState = (state) => state.messages;

//第一層;
export const selectMessages = createSelector(
  [selectMessagesState],
  (messagesSlice) => messagesSlice.messages
);
