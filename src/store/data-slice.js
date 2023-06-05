import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  expenses: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setCartData(state, action) {
      state.categories = action.payload.category;
      state.expenses = action.payload.expense;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
