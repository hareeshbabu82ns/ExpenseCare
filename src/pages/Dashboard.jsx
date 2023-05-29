import React from "react";
import Header from "../components/Header";
import { Card, Flex, IconButton } from "@chakra-ui/react";
import ExpenseCard from "../components/ExpenseCard";
import { wrap } from "framer-motion";
import { AddIcon } from "@chakra-ui/icons";
import TotalExpenseCard from "../components/TotalExpenseCard";
import PieChartCard from "../components/PieChartCard";
import TotalExpenseAccordion from "../components/TotalExpenseAccordion";
import { Wrap, WrapItem } from "@chakra-ui/react";
const categories = [
  { name: "Groceries", totalExpense: 4000 },
  { name: "Travel", totalExpense: 4000 },
  { name: "Rent", totalExpense: 15000 },
  { name: "Bills", totalExpense: 5000 },
  { name: "Subscriptions", totalExpense: 1000 },
  { name: "Others", totalExpense: 2000 },
];

function Dashboard() {
  return (
    <Flex flexDir={"column"} gap={2}>
      <Header />
      {/* <Flex gap={10} flexDir={{ base: "column", md: "row" }}>
        <TotalExpenseCard />
        <PieChartCard />
      </Flex> */}
      <TotalExpenseCard />
      <Flex
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
        p={10}
      >
        {categories.map((category) => (
          <ExpenseCard
            name={category.name}
            totalExpense={category.totalExpense}
          />
        ))}
      </Flex>
      <IconButton
        rounded={"full"}
        h={"4rem"}
        w={"4rem"}
        position={"fixed"}
        bottom={"1rem"}
        right={"1rem"}
        colorScheme="teal"
      >
        <AddIcon />
      </IconButton>
    </Flex>
  );
}

export default Dashboard;
