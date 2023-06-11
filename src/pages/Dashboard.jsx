import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import { wrap } from "framer-motion";
import { AddIcon } from "@chakra-ui/icons";
import TotalExpenseCard from "../components/dashboard/TotalExpenseCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import AddCategoryButton from "../components/dashboard/AddCategoryButton";
import { Box, RefreshCcw } from "lucide-react";
import { account, databases } from "../appwrite/appwrite-config";
import { Query } from "appwrite";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/data-actions";
import { PropagateLoader } from "react-spinners";

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
  const data = useSelector((state) => state.data);
  const userId = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);

  function refreshHandler() {
    setRefresh(true);
    dispatch(fetchData(userId));
    setTimeout(() => setRefresh(false), 5000);
  }

  const { categories, userCurrYearExpense, userCurrMonthExpense } = data;

  if (loading) {
    return (
      <Flex h={"100vh"} w={"100vw"} alignItems={"center"} flexDir={"column"}>
        <Text
          textColor={"teal.500"}
          fontSize={{ base: "3xl", md: "6xl" }}
          mt={"25vh"}
          mb={"4rem"}
        >
          ExpenseCare
        </Text>
        <PropagateLoader
          color="teal"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Flex>
    );
  }

  return (
    <Flex flexDir={"column"} gap={2} w={"100vw"} justifyContent={"center"}>
      <Header />
      <TotalExpenseCard
        userCurrYearExpense={userCurrYearExpense}
        userCurrMonthExpense={userCurrMonthExpense}
      />
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
            currMonthExpense={category.currMonthExpense}
            categoryId={category.$id}
          />
        ))}
      </Flex>
      {/* </Container> */}
      <Button
        position={"fixed"}
        bottom={"1rem"}
        left={"1rem"}
        colorScheme="teal"
        h={"4rem"}
        w={"4rem"}
        rounded={"full"}
        onClick={refreshHandler}
        isLoading={refresh}
      >
        <RefreshCcw />
      </Button>
      <AddCategoryButton />
    </Flex>
  );
}

export default Dashboard;
