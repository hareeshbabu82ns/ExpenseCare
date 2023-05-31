import { Text } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import ExpenseTable from "../components/ExpenseTable";
import DataTable from "../components/DataTable";
import DemoTable from "../components/DemoTable";
import Filters from "../components/Filters";
function AllExpenses() {
  return (
    <>
      <Header />
      <Filters />
      {/* <Text
        fontSize={"3xl"}
        fontWeight={"semibold"}
        textAlign={"center"}
        mt={5}
      >
        All Expenses
      </Text> */}
      {/* <ExpenseTable /> */}
      {/* <DataTable /> */}
      <DemoTable />
    </>
  );
}

export default AllExpenses;
