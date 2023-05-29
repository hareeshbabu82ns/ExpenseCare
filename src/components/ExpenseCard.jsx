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

function ExpenseCard({ name, totalExpense }) {
  const [hover, setHover] = useState(false);

  return (
    <Card
      h={"250px"}
      w={"250px"}
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
        <Button
          colorScheme="pink"
          mx={"auto"}
          w={"200px"}
          display={hover ? "block" : "none"}
        >
          Add expense
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ExpenseCard;
