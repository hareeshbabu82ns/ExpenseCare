import React from "react";
import Header from "../components/Header";
import { Card, Flex, IconButton } from "@chakra-ui/react";
import ExpenseCard from "../components/ExpenseCard";
import { wrap } from "framer-motion";
import { AddIcon } from "@chakra-ui/icons";

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
    <>
      <Header />
      <Flex
        p={20}
        gap={20}
        flexWrap={wrap}
        flexFlow={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
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
    </>
  );
}

export default Dashboard;
