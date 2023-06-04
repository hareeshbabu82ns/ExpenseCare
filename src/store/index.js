import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
  },
});

export default store;
