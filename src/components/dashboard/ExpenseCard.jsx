import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import AddExpenseButton from "./AddExpenseButton";
import DeleteCategoryButton from "../utility/DeleteCategoryButton";
import EditCategoryNameButton from "../utility/EditCategoryNameButton";
import { useSelector } from "react-redux";

function ExpenseCard({ name, currYearExpense, currMonthExpense, categoryId }) {
  const [hover, setHover] = useState(false);
  const showYearlyExpenses = useSelector(
    (state) => state.data.yearlyExpenseOnCard
  );

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
        <DeleteCategoryButton
          hover={hover}
          setHover={setHover}
          categoryId={categoryId}
        />
        <EditCategoryNameButton
          hover={hover}
          setHover={setHover}
          categoryName={name}
          categoryId={categoryId}
        />

        <CardHeader fontSize={"3xl"} fontWeight={"semibold"}>
          <Text>{name}</Text>
        </CardHeader>
        <CardBody fontSize={"xl"} fontWeight={"semibold"}>
          Rs. {showYearlyExpenses ? currYearExpense : currMonthExpense}
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
