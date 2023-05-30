import { Text } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import ExpenseTable from "../components/ExpenseTable";
function AllExpenses() {
  return (
    <>
      <Header />
      <Text
        fontSize={"3xl"}
        fontWeight={"semibold"}
        textAlign={"center"}
        mt={5}
      >
        All Expenses
      </Text>
      <ExpenseTable />
    </>
  );
}

export default AllExpenses;
