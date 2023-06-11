import React, { useEffect, useState } from "react";
import Header from "../components/Header";
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
      <DemoTable filteredExpenses={filteredExpenses} />
    </>
  );
}

export default AllExpenses;
