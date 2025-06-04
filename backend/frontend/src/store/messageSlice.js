import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  value: [],
};
const messageSlice = createSlice({
  name: "message",
  initialState: initialValue,
  reducers: {
    setSendMessage: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

export const { setSendMessage } = messageSlice.actions;
export default messageSlice.reducer;
