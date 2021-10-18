import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import snackReducer from './reducers/snackSlice'
import loadingReducer from './reducers/loadingSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
    loading: loadingReducer
  }
});
