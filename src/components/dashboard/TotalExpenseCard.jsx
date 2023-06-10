import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function TotalExpenseCard({ userCurrYearExpense, userCurrMonthExpense }) {
  return (
    <Flex
      bgColor={"lightgray"}
      border={"solid"}
      borderWidth={"thin"}
      rounded={"lg"}
      w={"80%"}
      justify={"space-around"}
      mt={5}
      mx={"auto"}
      alignItems={"center"}
      p={5}
      fontSize={"large"}
      fontWeight={"semibold"}
      flexDir={{ base: "column", md: "row" }}
      gap={{ base: "10px" }}
    >
      <Text>Current Year: Rs. {userCurrYearExpense}</Text>
      <Text>Current Month: Rs. {userCurrMonthExpense}</Text>
      <Button
        as={Link}
        rightIcon={<ArrowForwardIcon />}
        to="/charts"
        rounded={"lg"}
        colorScheme="pink"
      >
        Current Month's Charts
      </Button>
    </Flex>
  );
}

export default TotalExpenseCard;
