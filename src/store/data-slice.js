import { createSlice } from "@reduxjs/toolkit";
import { account, databases } from "../appwrite/appwrite-config";

const initialState = {
  userId: null,
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
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export function fetchData(userId) {
  return function (dispatch) {
    const promise = databases.getDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_DB_USER_ID,
      userId
    );

    promise.then(
      (userDocument) => {
        console.log(userDocument);
        dispatch(dataActions.setCartData(userDocument));
      },
      (error) => console.log(error)
    );
  };
}

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
