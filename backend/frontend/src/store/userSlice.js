import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  email: "",
  fullname: "",
  avatar: "",
  mobile: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state.fullname = action.payload?.fullname;
      state._id = action.payload?._id;
      state.email = action.payload?.email;
      state.mobile = action.payload?.mobile;
      state.avatar = action.payload?.avatar;
    },
    updatedAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    logout: (state) => {
      state.fullname = "";
      state._id = "";
      state.email = "";
      state.mobile = "";
      state.avatar = "";
    },
  },
});
export const { setUserDetails, logout, updatedAvatar } = userSlice.actions;
export default userSlice.reducer;
