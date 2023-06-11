import React from "react";
import { categories } from "./Dashboard";
import { Cell, Pie, PieChart } from "recharts";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import Header from "../components/Header";
import { Flex } from "@chakra-ui/react";
import ExpenseBarGraph from "../components/charts/ExpenseBarGraph";
import ExpenseChartFilter from "../components/charts/ExpenseChartFilter";

function Charts() {
  return (
    <>
      <Header />
      <ExpenseChartFilter />
      <Flex
        mt={"2rem"}
        minH={"75vh"}
        w={"100vw"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <ExpenseBarGraph />
        <ExpensePieChart />
      </Flex>
    </>
  );
}

export default Charts;
