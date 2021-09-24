import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "user",
    email: "user@mail.com",
    isVerified: false,
    isLoggedin: false,
    role: "student"
  },
  reducers: {
    userInfo: (state, { payload }) => {
      state.userName = payload.userName;
      state.email = payload.email;
      state.isVerified = payload.isVerified;
      state.role = payload.role;
    },
    loggin: (state) => {
      state.isLoggedin = true;
    }
  }
});

export const { userInfo, loggin } = userSlice.actions;
export default userSlice.reducer;
