import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";

function TotalExpenseCard() {
  return (
    <Flex
      bg={"teal.600"}
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
      <Text>Current Year: Rs. 150000</Text>
      <Text>Current Month: Rs. 50000</Text>
      <Button rounded={"full"} colorScheme="pink">
        View Charts
      </Button>
    </Flex>
  );
}

export default TotalExpenseCard;
