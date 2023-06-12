import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Flex, useToast } from "@chakra-ui/react";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import TotalExpenseCard from "../components/dashboard/TotalExpenseCard";
import AddCategoryButton from "../components/dashboard/AddCategoryButton";
import { RefreshCcw } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/data-actions";

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
  const dispatch = useDispatch();
  const toast = useToast();

  const [refresh, setRefresh] = useState(false);

  function refreshHandler() {
    setRefresh(true);
    dispatch(fetchData(userId));
    setTimeout(() => {
      setRefresh(false);
      toast({
        title: "Refreshed the data",
        status: "info",
        colorScheme: "blue",
      });
    }, 3000);
  }

  const { categories, userCurrYearExpense, userCurrMonthExpense } = data;

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
