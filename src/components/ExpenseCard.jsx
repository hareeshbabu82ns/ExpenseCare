import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddExpenseButton from "./AddExpenseButton";

function ExpenseCard({ name, totalExpense }) {
  const [hover, setHover] = useState(false);

  return (
    <Card
      h={"250px"}
      w={{ base: "300px", md: "250px" }}
      bgColor={"blue.700"}
      textAlign={"center"}
      color={"text"}
      p={2}
      variant={"elevated"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardHeader fontSize={"3xl"} fontWeight={"semibold"}>
        {name}
      </CardHeader>
      <CardBody fontSize={"xl"} fontWeight={"semibold"}>
        Rs. {totalExpense}
      </CardBody>
      <CardFooter>
        <AddExpenseButton
          hover={hover}
          setHover={setHover}
          categoryName={name}
        />
      </CardFooter>
    </Card>
  );
}

export default ExpenseCard;
