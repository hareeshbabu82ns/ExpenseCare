import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  price: 0,
  year: 0,
  month: 0,
};

// filters required for the expense table to show data

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
