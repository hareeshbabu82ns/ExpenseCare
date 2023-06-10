import { createSlice } from "@reduxjs/toolkit";
import { account, databases } from "../appwrite/appwrite-config";
import { Query } from "appwrite";

const initialState = {
  filteredExpenses: [],
  totalFilteredExpenses: [],
  filterInputs: {
    categoryId: null,
    categoryName: null,
    sortBy: null,
    sortByOption: null,
    year: null,
    month: null,
    monthName: null,
  },
};

/* State to provide filters required for the expense table to show data */

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilteredExpenses(state, action) {
      state.filteredExpenses = action.payload.documents;
      state.totalFilteredExpenses = action.payload?.total;
    },
    setFilterInputs(state, action) {
      state.filterInputs = action.payload;
    },
    resetFilterInputs(state) {
      state.filterInputs = initialState;
    },
    setCategory(state, action) {
      state.categoryId = action.payload;
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

export function updateFilteredExpenses({ categoryId, sortBy, year, month }) {
  return function (dispatch) {
    const queries = [];
    let userId = null;

    account.get().then(
      (user) => {
        userId = user.$id;
        queries.push({ attribute: "userId", value: userId });

        if (categoryId)
          queries.push({ attribute: "categoryId", value: categoryId });
        if (year) queries.push({ attribute: "year", value: parseInt(year) });
        if (month) queries.push({ attribute: "month", value: parseInt(month) });

        const orderAscQuery = [];
        const orderDescQuery = [];

        switch (sortBy) {
          case "amountDescending":
            orderDescQuery.push("amount");
            break;
          case "amountAscending":
            orderAscQuery.push("amount");
            break;
          case "dateDescending":
            orderDescQuery.push("time");
            break;
          case "dateAscending":
            orderAscQuery.push("time");
            break;
        }

        databases
          .listDocuments(
            import.meta.env.VITE_DB_ID,
            import.meta.env.VITE_DB_EXPENSE_ID,
            [
              ...queries.map((query) =>
                Query.equal(query.attribute, query.value)
              ),
              ...orderAscQuery.map((attribute) => Query.orderAsc(attribute)),
              ...orderDescQuery.map((attribute) => Query.orderDesc(attribute)),
            ]
          )
          .then(
            (response) => {
              console.log(response);
              dispatch(filterActions.setFilteredExpenses(response));
            },
            (error) => console.log(error)
          );
      },
      (error) => console.log(error)
    );
  };
}
