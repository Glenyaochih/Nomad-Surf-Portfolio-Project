import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};
export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setCreateMessage: (state, action) => {
      console.log(action.payload);
      if (action.payload.success) {
        state.messages.push({
          id: action.payload.id,
          type: 'primary-100',
          title: '成功',
          text: action.payload.message,
        });
      } else {
        state.messages.push({
          id: action.payload.id,
          type: 'accent-100',
          title: '錯誤',
          text: Array.isArray(action.payload.message)
            ? action.payload?.message.join('`')
            : action.payload?.message,
        });
      }
    },
    setRemoveMessage: (state, action) => {
      const index = state.messages.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  'messages/createMessage',
  async (message, { dispatch, requestId }) => {
    dispatch(
      messageSlice.actions.setCreateMessage({
        ...message,
        id: requestId,
      })
    );
    setTimeout(() => {
      dispatch(messageSlice.actions.setRemoveMessage(requestId));
    }, 3000);
  }
);

export default messageSlice.reducer;
