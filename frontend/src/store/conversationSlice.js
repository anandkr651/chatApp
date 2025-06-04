import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  value: "",
};
const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialValue,
  reducers: {
    setConversation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
