import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import React from "react";

function TotalExpenseCard() {
  return (
    <Card
      minW={"300px"}
      w={"500px"}
      mx={"auto"}
      textAlign={"center"}
      color={"text"}
      bgColor={"teal.600"}
    >
      <CardHeader fontSize={"xl"} fontWeight={"semibold"}>
        Current Total Expense
      </CardHeader>
      <CardBody fontSize={"large"} fontWeight={"semibold"}>
        <Text>Year : Rs. 150000</Text>
        <Text>Month : Rs. 25000</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="pink" mx={"auto"}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TotalExpenseCard;
