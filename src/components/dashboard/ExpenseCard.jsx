import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import AddExpenseButton from "./AddExpenseButton";
import DeleteExpenseButton from "../utility/DeleteExpenseButton";
import EditExpenseNameButton from "../utility/EditExpenseNameButton";
import { useSelector } from "react-redux";

function ExpenseCard({ name, totalAmount, categoryId }) {
  const [hover, setHover] = useState(false);

  return (
    <>
      <Card
        h={"250px"}
        w={{ base: "300px", md: "300px" }}
        bgColor={"blue.600"}
        textAlign={"center"}
        color={"text"}
        p={2}
        variant={"elevated"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DeleteExpenseButton
          hover={hover}
          setHover={setHover}
          categoryId={categoryId}
        />
        <EditExpenseNameButton
          hover={hover}
          setHover={setHover}
          categoryName={name}
          categoryId={categoryId}
        />

        <CardHeader fontSize={"3xl"} fontWeight={"semibold"}>
          <Text>{name}</Text>
        </CardHeader>
        <CardBody fontSize={"xl"} fontWeight={"semibold"}>
          Rs. {totalAmount}
        </CardBody>
        <CardFooter>
          <AddExpenseButton
            hover={hover}
            setHover={setHover}
            categoryName={name}
            categoryId={categoryId}
          />
        </CardFooter>
      </Card>
    </>
  );
}

export default ExpenseCard;
