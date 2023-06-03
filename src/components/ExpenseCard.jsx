import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Fade,
  Flex,
  GridItem,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddExpenseButton from "./AddExpenseButton";
import MoreVertical from "../assets/icons/MoreVertical";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteExpenseButton from "./DeleteExpenseButton";
import EditExpenseNameButton from "./EditExpenseNameButton";

function ExpenseCard({ name, totalExpense }) {
  const [hover, setHover] = useState(false);

  return (
    <>
      <Card
        h={"250px"}
        w={{ base: "300px", md: "250px" }}
        bgColor={"blue.600"}
        textAlign={"center"}
        color={"text"}
        p={2}
        variant={"elevated"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DeleteExpenseButton hover={hover} setHover={setHover} />
        <EditExpenseNameButton
          hover={hover}
          setHover={setHover}
          categoryName={name}
        />

        <CardHeader fontSize={"3xl"} fontWeight={"semibold"}>
          <Text>{name}</Text>
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
    </>
  );
}

export default ExpenseCard;
