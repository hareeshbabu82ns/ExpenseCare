import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  expenses: [],
};

/* State to provide and set the updated categories and expenses data to all the app components */

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    /* sets the fetched data received in payload to the state */
    setData(state, action) {
      state.categories = action.payload.categories;
      state.expenses = action.payload.expenses;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
