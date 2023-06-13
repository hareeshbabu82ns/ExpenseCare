import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import TotalExpenseCard from "../components/dashboard/TotalExpenseCard";
import AddCategoryButton from "../components/dashboard/AddCategoryButton";
import { MoreVertical, RefreshCcw, SlidersHorizontalIcon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/data-actions";
import { dataActions } from "../store/data-slice";
import { account } from "../appwrite/appwrite-config";

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
  const showYearlyExpenses = useSelector(
    (state) => state.data.yearlyExpensesOnCard
  );

  const { isOpen, onToggle, onClose } = useDisclosure();

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
      <Text
        textColor={"whiteAlpha.700"}
        fontStyle={"italic"}
        textAlign={"center"}
        mt={2}
      >
        Cards are showing current {showYearlyExpenses ? "year's" : "month's"}{" "}
        expenses
      </Text>
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

      <Popover
        placement="top-end"
        closeOnBlur
        closeOnEsc
        onClose={onClose}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Button
            position={"fixed"}
            bottom={"1rem"}
            left={"1rem"}
            colorScheme="pink"
            h={"4rem"}
            w={"4rem"}
            rounded={"full"}
            onClick={onToggle}
          >
            <SlidersHorizontalIcon />{" "}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent bgColor={"lightgray"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign={"center"}>
              Show Card Expenses
            </PopoverHeader>
            <PopoverBody display={"flex"} flexDir={"column"} gap={1}>
              <Button
                w={"100%"}
                bgColor={showYearlyExpenses ? "pink.500" : "inherit"}
                _hover={{ bgColor: "pink.600" }}
                _active={{ bgColor: "pink.600" }}
                onClick={() => {
                  dispatch(dataActions.setYearlyExpensesOnCard(true));
                  onToggle();
                }}
              >
                Yearly
              </Button>
              <Button
                w={"100%"}
                bgColor={showYearlyExpenses ? "inherit" : "pink.500"}
                _hover={{ bgColor: "pink.600" }}
                _active={{ bgColor: "pink.600" }}
                onClick={() => {
                  dispatch(dataActions.setYearlyExpensesOnCard(false));
                  onToggle();
                }}
              >
                Monthly
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      {/* </Container> */}
      {/* <Button
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
      </Button> */}
      <AddCategoryButton />
    </Flex>
  );
}

export default Dashboard;
