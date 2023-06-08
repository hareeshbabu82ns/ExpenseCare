import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import {
  Card,
  Container,
  Flex,
  Grid,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import { wrap } from "framer-motion";
import { AddIcon } from "@chakra-ui/icons";
import TotalExpenseCard from "../components/dashboard/TotalExpenseCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import AddCategoryButton from "../components/dashboard/AddCategoryButton";
import { Box } from "lucide-react";
import { account, databases } from "../appwrite/appwrite-config";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

export const categories = [
  { name: "Groceries", totalExpense: 4000 },
  { name: "Travel", totalExpense: 4000 },
  { name: "Rent", totalExpense: 15000 },
  { name: "Bills", totalExpense: 5000 },
  { name: "Subscriptions", totalExpense: 1000 },
  { name: "Others", totalExpense: 2000 },
];
// export const categories = [];

function Dashboard() {
  const categories = useSelector((state) => state.data.categories);

  return (
    <Flex flexDir={"column"} gap={2} w={"100vw"} justifyContent={"center"}>
      <Header />
      <TotalExpenseCard />
      {/* <Container w={"100%"} mx={"auto"}> */}
      <Flex
        flexWrap={"wrap"}
        gap={10}
        px={10}
        py={5}
        alignContent="center"
        justifyContent={"center"}
      >
        {categories?.map((category) => (
          <ExpenseCard
            key={category.$id}
            name={category.name}
            totalAmount={category.totalAmount}
            categoryId={category.$id}
          />
        ))}
      </Flex>
      {/* </Container> */}
      <AddCategoryButton />
    </Flex>
  );
}

export default Dashboard;
