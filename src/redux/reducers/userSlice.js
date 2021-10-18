import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "user",
  email: "user@mail.com",
  isVerified: false,
  isLoggedin: false,
  role: "student"
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, { payload }) => {
      state.userName = payload.userName;
      state.email = payload.email;
      state.isVerified = payload.isVerified;
      state.role = payload.role;
    },
    loggin: (state) => {
      state.isLoggedin = true;
    },
    logout: (state) => initialState
  }
});

export const { userInfo, loggin, logout } = userSlice.actions;
export default userSlice.reducer;
