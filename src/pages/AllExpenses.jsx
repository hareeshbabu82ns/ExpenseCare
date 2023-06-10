import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ExpenseTable from "../components/table/ExpenseTable";
import DataTable from "../components/table/DataTable";
import DemoTable from "../components/table/DemoTable";
import Filters from "../components/table/Filters";
import { useSelector } from "react-redux";
function AllExpenses() {
  const expenses = useSelector((state) => state.filter.filteredExpenses);

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);
  return (
    <>
      <Header />
      <Filters setFilteredExpenses={setFilteredExpenses} />
      {/* <ExpenseTable /> */}
      {/* <DataTable /> */}
      <DemoTable filteredExpenses={filteredExpenses} />
    </>
  );
}

export default AllExpenses;
