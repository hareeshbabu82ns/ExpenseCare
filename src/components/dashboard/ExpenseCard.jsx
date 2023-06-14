import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import AddExpenseButton from "./AddExpenseButton";
import DeleteCategoryButton from "../utility/DeleteCategoryButton";
import EditCategoryNameButton from "../utility/EditCategoryNameButton";
import { useDispatch, useSelector } from "react-redux";
import {
  filterActions,
  updateFilteredExpenses,
} from "../../store/filter-slice";
import { months } from "../table/Filters";
import { useNavigate } from "react-router-dom";

function ExpenseCard({ category }) {
  const { name, currYearExpense, currMonthExpense, $id: categoryId } = category;
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterInputs = useSelector((state) => state.filter.filterInputs);
  const showYearlyExpenses = useSelector(
    (state) => state.data.yearlyExpenseOnCard
  );

  function clickHandler() {
    const [currYear, currMonth] = [
      new Date().getFullYear(),
      new Date().getMonth(),
    ];
    dispatch(
      filterActions.setFilterInputs({
        categoryId,
        categoryName: name,
        sortBy: null,
        sortByOption: null,
        year: currYear,
        month: currMonth,
        monthName: months.find((month) => month.value === currMonth).option,
      })
    );

    dispatch(updateFilteredExpenses(filterInputs));

    navigate("/all-expenses");
  }

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
        <CardBody
          fontSize={"xl"}
          fontWeight={"semibold"}
          onClick={clickHandler}
          cursor={"pointer"}
        >
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
