import React from "react";
import Header from "../components/Header";
import { Card, Flex, IconButton } from "@chakra-ui/react";
import ExpenseCard from "../components/ExpenseCard";
import { wrap } from "framer-motion";
import { AddIcon } from "@chakra-ui/icons";
import TotalExpenseCard from "../components/TotalExpenseCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import AddCategoryButton from "../components/AddCategoryButton";
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
            key={category.name}
            name={category.name}
            totalExpense={category.totalExpense}
          />
        ))}
      </Flex>
      <AddCategoryButton />
    </Flex>
  );
}

export default Dashboard;
