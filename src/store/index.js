import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter-slice";
import authReducer from "./auth-slice";
import dataReducer from "./data-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    data: dataReducer,
  },
});

export default store;
