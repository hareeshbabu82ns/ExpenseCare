import React from "react";
import Header from "../components/Header";
import ExpenseTable from "../components/table/ExpenseTable";
import DataTable from "../components/table/DataTable";
import DemoTable from "../components/table/DemoTable";
import Filters from "../components/table/Filters";
function AllExpenses() {
  return (
    <>
      <Header />
      <Filters />
      {/* <ExpenseTable /> */}
      {/* <DataTable /> */}
      <DemoTable />
    </>
  );
}

export default AllExpenses;
