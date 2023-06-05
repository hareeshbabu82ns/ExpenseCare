import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter-slice";
import authReducer from "./auth-slice";
import dataReducer from "./data-slice";

/*
reducer:
  auth - logged in user's userId and email
  filter - filter values to filter data on the all expenses page
  data - updated categories and expenses data
*/

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    data: dataReducer,
  },
});

export default store;
