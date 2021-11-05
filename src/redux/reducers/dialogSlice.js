import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "snack",
  initialState: {
    open: false,
    title: "Some info",
    confimation: false
  },
  reducers: {
    openDialof: (state, { payload }) => {
      state.open = true;
      state.title = payload.title;
      state.confimation = payload.confimation;
    },
    closeDialog: (state) => {
      state.open = false;
    }
  }
});

export const { openDialof, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;