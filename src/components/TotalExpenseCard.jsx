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
import { Link } from "react-router-dom";

function TotalExpenseCard() {
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
      <Text>Current Year: Rs. 150000</Text>
      <Text>Current Month: Rs. 50000</Text>
      <Button as={Link} to="/charts" rounded={"lg"} colorScheme="pink">
        Current Month's Charts
      </Button>
    </Flex>
  );
}

export default TotalExpenseCard;
