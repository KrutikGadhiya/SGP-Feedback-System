import { createSlice } from "@reduxjs/toolkit";

export const snackSlice = createSlice({
  name: "snack",
  initialState: {
    open: false,
    message: "Some info",
    type: "info"
  },
  reducers: {
    openSnack: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.type = payload.type;
    },
    closeSnack: (state) => {
      state.open = false;
    }
  }
});

export const { openSnack, closeSnack } = snackSlice.actions;

export default snackSlice.reducer;
